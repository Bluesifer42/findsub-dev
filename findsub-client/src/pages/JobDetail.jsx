import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';

function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch job details (including requiredKinks) from the server.
  useEffect(() => {
    fetch(`http://localhost:5000/api/job/${jobId}`)
      .then(res => res.json())
      .then(data => setJob(data.job))
      .catch(err => {
        console.error(err);
        setStatus('❌ Failed to load job details.');
      });
  }, [jobId]);

  // Fetch feedback for the job.
  useEffect(() => {
    fetch(`http://localhost:5000/api/feedback/job/${jobId}`)
      .then(res => res.json())
      .then(data => setFeedback(data.feedback))
      .catch(err => console.error(err));
  }, [jobId]);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleDeleteJob = async () => {
    const confirmDelete = window.confirm('Are you sure you want to permanently delete this job?');
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/api/jobs/delete/${jobId}`, { method: 'DELETE' });
    const data = await res.json();
    alert(data.message);
    navigate('/jobs');
  };

  const handleUpdateStatus = async (newStatus) => {
    const confirmStatus = window.confirm(`Are you sure you want to mark this job as ${newStatus}?`);
    if (!confirmStatus) return;

    const res = await fetch('http://localhost:5000/api/jobs/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, newStatus })
    });
    const data = await res.json();
    alert(data.message);
    window.location.reload();
  };

  const handleFeedbackClick = () => {
    if (!job.selectedApplicant) return alert('Feedback is not available until an applicant is selected.');
    setShowFeedbackForm(true);
  };

  if (status) return <p>{status}</p>;
  if (!job) return <p>Loading job details...</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Compensation:</strong> {job.compensation}</p>
      {job.requirements && <p><strong>Requirements:</strong> {job.requirements}</p>}
      {job.category && <p><strong>Category:</strong> {job.category}</p>}
      {job.requiredKinks && job.requiredKinks.length > 0 && (
        <p>
          <strong>Required Kinks:</strong> {job.requiredKinks.map(k => k.name).join(', ')}
        </p>
      )}
      {job.expiresAt && <p><strong>Expires:</strong> {new Date(job.expiresAt).toLocaleDateString()}</p>}
      <p><strong>Status:</strong> {job.status}</p>
      <p>
        <strong>Posted by:</strong>{' '}
        <Link to={`/profile/${job.posterId._id}`}>{job.posterId.username}</Link>
      </p>
      
      <div style={{ marginTop: '1rem' }}>
        {user && user.id === job.posterId._id && (
          <>
            <button onClick={() => navigate(`/jobs/edit/${job._id}`)}>✏️ Edit Job</button>
            <button onClick={handleDeleteJob}>🗑️ Delete Job</button>
          </>
        )}
        {user && user.role === 'Sub' && !job.isFilled && (
          <button onClick={async () => {
            const confirmed = window.confirm('Do you want to apply for this job?');
            if (!confirmed) return;
            const cover = prompt('Optional: Add a message (or leave blank):');
            if (cover === null) return alert('Application cancelled.');
            const res = await fetch('http://localhost:5000/api/apply', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                jobId: job._id,
                applicantId: user.id,
                coverLetter: cover.trim()
              })
            });
            const data = await res.json();
            if (res.ok) {
              alert('✅ Application submitted!');
            } else {
              alert(`❌ ${data.message}`);
            }
          }}>Apply / Express Interest</button>
        )}
        {job.isFilled && (
          <>
            <button onClick={handleFeedbackClick}>Leave Feedback</button>
            <button onClick={() => handleUpdateStatus('completed')}>Mark as Completed</button>
            <button onClick={() => handleUpdateStatus('failed')}>Mark as Failed</button>
          </>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Feedback</h3>
        {feedback.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          feedback.map(f => (
            <div key={f._id} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem 0' }}>
              <p>
                <strong>From:</strong> {f.fromUser.username} ({f.fromUser.role})
              </p>
              {f.generalRatings && (
                <>
                  <p><strong>General Ratings:</strong></p>
                  <ul>
                    {Array.from(f.generalRatings.entries()).map(([key, value]) => (
                      <li key={key}>{key}: {value} / 5</li>
                    ))}
                  </ul>
                </>
              )}
              {typeof f.honestyScore !== 'undefined' && (
                <p><strong>Honesty Score:</strong> {f.honestyScore} / 5</p>
              )}
              {f.comment && (
                <p>
                  <strong>Comment:</strong> {f.comment}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {showFeedbackForm && (
        <div style={{ marginTop: '2rem' }}>
          <FeedbackForm 
            jobId={job._id}
            fromUser={user.id}
            toUser={job.selectedApplicant}
            role={user.role}
            // For feedback: if user is Sub, then targetInterests are taken from the poster's kinks; if Dom, from the selected applicant's kinks.
            targetInterests={user.role === 'Sub' ? (job.posterId.kinks || []) : (job.selectedApplicant.kinks || [])}
          />
          <button onClick={() => setShowFeedbackForm(false)} style={{ marginTop: '1rem' }}>
            Close Feedback Form
          </button>
        </div>
      )}
    </div>
  );
}

export default JobDetail;
