import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function JobManager() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobData, setSelectedJobData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      fetch(`http://localhost:5000/api/jobs?view=poster&posterId=${parsed.id}`)
        .then(res => res.json())
        .then(data => {
          const myJobs = data.jobs.filter(job => job.posterId?._id === parsed.id);
          setJobs(myJobs);
        });
    }
  }, []);

  const loadApplicants = async (jobId) => {
    setSelectedJob(jobId);

    const res = await fetch(`http://localhost:5000/api/applications/${jobId}`);
    const data = await res.json();
    setApplications(data.applications || []);

    const jobInfo = jobs.find(j => j._id === jobId);
    setSelectedJobData(jobInfo);
  };

  const selectApplicant = async (applicantId) => {
    const confirm = window.confirm('Are you sure you want to select this applicant? This will close the job.');
    if (!confirm) return;

    const res = await fetch('http://localhost:5000/api/jobs/select', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: selectedJob, applicantId })
    });

    const data = await res.json();
    alert(data.message);
    window.location.reload();
  };

  const leaveFeedback = async () => {
    if (!selectedJobData?.selectedApplicant) return alert('No applicant selected yet.');

    const rating = prompt('Rate the selected user (1 to 5):');
    if (!rating || rating < 1 || rating > 5) return alert('Invalid rating.');

    const comment = prompt('Leave a comment (optional):');

    const res = await fetch('http://localhost:5000/api/feedback/poster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId: selectedJob,
        fromUser: user.id,
        toUser: selectedJobData.selectedApplicant,
        rating,
        comment
      })
    });

    const data = await res.json();
    alert(data.message);
  };

  const updateJobStatus = async (newStatus) => {
    const confirm = window.confirm(`Are you sure you want to mark this job as ${newStatus}?`);
    if (!confirm) return;

    const res = await fetch('http://localhost:5000/api/jobs/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: selectedJob, newStatus })
    });

    const data = await res.json();
    alert(data.message);
    window.location.reload();
  };

  const deleteJob = async (jobId) => {
    const confirm = window.confirm('Are you sure you want to permanently delete this job?');
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/api/jobs/delete/${jobId}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    alert(data.message);
    window.location.reload();
  };

  if (!user || (user.role !== 'Dom' && user.role !== 'Switch')) {
    return <p>Access denied. Only Doms and Switches can manage jobs.</p>;
  }

  return (
    <div>
      <h2>My Job Posts</h2>

      {jobs.length === 0 && <p>You haven't posted any jobs yet.</p>}

      {jobs.map((job) => (
        <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Start:</strong> {new Date(job.startDate).toLocaleDateString()} at {job.startTime || '—'}</p>
          <p><strong>Min Duration:</strong> {job.minDuration || 'Not set'}</p>

          {job.status === 'cancelled' && (
            <>
              <p style={{ color: 'red' }}>🚫 This job was cancelled.</p>
              <button onClick={() => deleteJob(job._id)}>Delete</button>
              <button onClick={() => navigate(`/jobs/edit/${job._id}`)}>✏️ Edit & Re-List</button>
            </>
          )}

          {job.isFilled ? (
            <p style={{ color: 'green' }}>✅ Job is filled.</p>
          ) : (
            <p style={{ color: 'orange' }}>🕓 Job is open.</p>
          )}

          {job.status === 'open' && (
            <button onClick={() => loadApplicants(job._id)}>View Applicants</button>
          )}
        </div>
      ))}

      {/* Applicant Viewer & Controls */}
      {selectedJob && (
        <>
          <h3>Applicants for Job ID: {selectedJob}</h3>

          {applications.length === 0 ? (
            <p>No one has applied yet.</p>
          ) : (
            applications.map((app) => (
              <div key={app._id} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ddd' }}>
                <p><strong>Username:</strong> <Link to={`/profile/${app.applicantId._id}`}>{app.applicantId.username}</Link></p>
                <p><strong>Role:</strong> {app.applicantId.role}</p>
                <p><strong>Experience:</strong> {app.applicantId.experienceLevel}</p>
                <p><strong>Message:</strong> {app.coverLetter || '(no message)'}</p>

                {!selectedJobData?.isFilled && (
                  <button onClick={() => selectApplicant(app.applicantId._id)}>Select</button>
                )}
              </div>
            ))
          )}

          {selectedJobData?.isFilled && (
            <>
              <p style={{ color: 'green', marginTop: '1rem' }}>
                ✅ This job has been filled.
              </p>
              <button onClick={leaveFeedback}>Leave Feedback for Selected Sub</button>
              <button onClick={() => updateJobStatus('completed')}>✅ Mark as Completed</button>
              <button onClick={() => updateJobStatus('failed')}>❌ Mark as Failed</button>
            </>
          )}

          {selectedJobData?.status === 'open' && (
            <div style={{ marginTop: '1rem' }}>
              <button onClick={() => updateJobStatus('cancelled')}>🚫 Cancel Job</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JobManager;
