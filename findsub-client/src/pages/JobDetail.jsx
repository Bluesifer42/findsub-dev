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

  // Helper function to find a human-readable kink name from a kink ID.
  // It looks into the job's populated requiredKinks as well as
  // the poster's and selected applicant's kinks.
  const findKinkName = (kinkId) => {
    if (job) {
      // Check requiredKinks first.
      if (job.requiredKinks && job.requiredKinks.length > 0) {
        const match = job.requiredKinks.find(k => k._id.toString() === kinkId);
        if (match && match.name) return match.name;
      }
      // Check poster's kinks.
      if (job.posterId && job.posterId.kinks && job.posterId.kinks.length > 0) {
        const match = job.posterId.kinks.find(entry => {
          const id = typeof entry.kink === 'object' && entry.kink._id 
            ? entry.kink._id.toString() 
            : String(entry.kink);
          return id === kinkId;
        });
        if (match && match.kink && match.kink.name) return match.kink.name;
      }
      // Check selectedApplicant's kinks.
      if (job.selectedApplicant && job.selectedApplicant.kinks && job.selectedApplicant.kinks.length > 0) {
        const match = job.selectedApplicant.kinks.find(entry => {
          const id = typeof entry.kink === 'object' && entry.kink._id 
            ? entry.kink._id.toString() 
            : String(entry.kink);
          return id === kinkId;
        });
        if (match && match.kink && match.kink.name) return match.kink.name;
      }
    }
    return kinkId; // fallback: show the raw ID
  };

  // Fetch job details.
  useEffect(() => {
    fetch(`http://localhost:5000/api/job/${jobId}`)
      .then(res => res.json())
      .then(data => setJob(data.job))
      .catch(err => {
        console.error('Job detail fetch error:', err);
        setStatus('❌ Failed to load job details.');
      });
  }, [jobId]);

  // Fetch feedback for the job.
  useEffect(() => {
    fetch(`http://localhost:5000/api/feedback/job/${jobId}`)
      .then(res => res.json())
      .then(data => setFeedback(data.feedback))
      .catch(err => console.error('Feedback fetch error:', err));
  }, [jobId]);

  // Load current user from localStorage.
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Handler: Apply for a job (for Subs).
  const handleApply = async () => {
    const confirmed = window.confirm('Do you want to apply for this job?');
    if (!confirmed) return;
    const cover = prompt('Optional: Add a message (or leave blank):');
    if (cover === null) return alert('Application cancelled.');
    try {
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
    } catch (error) {
      console.error('Application error:', error);
      alert('Error applying for job.');
    }
  };

  // Handler: Delete a job.
  const handleDeleteJob = async () => {
    const confirmDelete = window.confirm('Are you sure you want to permanently delete this job?');
    if (!confirmDelete) return;
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/delete/${jobId}`, { method: 'DELETE' });
      const data = await res.json();
      alert(data.message);
      navigate('/jobs');
    } catch (error) {
      console.error('Job delete error:', error);
      alert('Error deleting job.');
    }
  };

  // Handler: Update job status.
  const handleUpdateStatus = async (newStatus) => {
    const confirmStatus = window.confirm(`Are you sure you want to mark this job as ${newStatus}?`);
    if (!confirmStatus) return;
    try {
      const res = await fetch('http://localhost:5000/api/jobs/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, newStatus })
      });
      const data = await res.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error('Status update error:', error);
      alert('Error updating status.');
    }
  };

  // Handler: Show feedback form.
  const handleFeedbackClick = () => {
    if (!job.selectedApplicant) {
      alert('Feedback is not available until an applicant is selected.');
      return;
    }
    setShowFeedbackForm(true);
  };

  if (status) return <p>{status}</p>;
  if (!job) return <p>Loading job details...</p>;

  return (
    <div>
      {/* Job Title always clickable */}
      <h2>
        <Link to={`/job/${job._id}`}>{job.title}</Link>
      </h2>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Compensation:</strong> {job.compensation}</p>
      {job.requirements && <p><strong>Requirements:</strong> {job.requirements}</p>}
      {job.category && <p><strong>Category:</strong> {job.category}</p>}
      {job.requiredKinks && job.requiredKinks.length > 0 && (
        <div>
          <strong>Required Kinks:</strong>
          <ul>
            {job.requiredKinks.map((kink) => (
              <li key={kink._id}>
                {kink.name}
                {kink.description && (
                  <span style={{ fontSize: '0.8em', color: '#666' }}>
                    {' '}– {kink.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {job.expiresAt && (
        <p>
          <strong>Expires:</strong> {new Date(job.expiresAt).toLocaleDateString()}
        </p>
      )}
      <p><strong>Status:</strong> {job.status}</p>
      <p>
        <strong>Posted by:</strong>{' '}
        <Link to={`/profile/${job.posterId._id}`}>{job.posterId.username}</Link>
      </p>

      {/* Action Buttons */}
      <div style={{ marginTop: '1rem' }}>
        {user && user.role === 'Dom' && (user._id === job.posterId._id || user.id === job.posterId._id) && (
          <div>
            <button onClick={() => navigate(`/jobs/edit/${job._id}`)}>✏️ Edit Job</button>
            <button onClick={handleDeleteJob}>🗑️ Delete Job</button>
            {job.status === 'open' && (
              <button onClick={() => handleUpdateStatus('cancelled')}>Cancel Job</button>
            )}
            {job.status === 'filled' && (
              <>
                <button onClick={() => handleUpdateStatus('completed')}>Mark as Completed</button>
                <button onClick={() => handleUpdateStatus('failed')}>Mark as Failed</button>
              </>
            )}
          </div>
        )}

        {user && user.role === 'Sub' && job.status === 'open' && (
          <button onClick={handleApply}>Apply / Express Interest</button>
        )}

        {user && user.role === 'Sub' && job.status === 'completed' && (
          <button onClick={handleFeedbackClick}>Leave Feedback</button>
        )}
      </div>

      {/* Feedback Section */}
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
              {f.generalRatings && typeof f.generalRatings === 'object' && (
                <>
                  <p><strong>General Ratings:</strong></p>
                  <ul>
                    {Object.entries(f.generalRatings).map(([key, value]) => (
                      <li key={key}>{key}: {value} / 5</li>
                    ))}
                  </ul>
                </>
              )}
              {f.interestRatings && typeof f.interestRatings === 'object' && (
                <>
                  <p><strong>Interest Ratings:</strong></p>
                  <ul>
                    {Object.entries(f.interestRatings).map(([kinkId, ratingVal]) => (
                      <li key={kinkId}>
                        {findKinkName(kinkId)}: {ratingVal} / 5
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {typeof f.honestyScore !== 'undefined' && (
                <p><strong>Honesty Score:</strong> {f.honestyScore} / 5</p>
              )}
              {f.comment && (
                <p><strong>Comment:</strong> {f.comment}</p>
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
            targetInterests={
              user.role === 'Sub'
                ? (job.posterId.kinks || [])
                : (job.selectedApplicant.kinks || [])
            }
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
