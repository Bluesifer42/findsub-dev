import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DomActiveJobs() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;

    const parsed = JSON.parse(stored);
    setUser(parsed);

    const userId = parsed._id || parsed.id;
    if (!userId || parsed.role !== 'Dom') return;

    fetch(`http://localhost:5000/api/jobs?view=poster&posterId=${userId}`)
      .then(res => res.json())
      .then(data => {
        const active = (data.jobs || []).filter(job =>
          job.selectedApplicant &&
          job.posterId._id === userId &&
          (
            (job.status === 'filled' && !job.completedOn) ||
            (job.status === 'completed' && job.domFeedbackLeft === false)
          )
        );
        setJobs(active);
      })
      .catch(() => setStatus('❌ Failed to load active jobs.'));
  }, []);

  const handleLeaveFeedback = (jobId) => {
    navigate(`/job/${jobId}`); // Or navigate to a specific feedback form
  };

  return (
    <div>
      <h2>Active Jobs (Sub Selected or Awaiting Feedback)</h2>
      {status && <p>{status}</p>}

      {jobs.length === 0 ? (
        <p>No active jobs at the moment.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3><Link to={`/job/${job._id}`}>{job.title}</Link></h3>
            <p>{job.description}</p>
            <p><strong>Selected Sub:</strong> {job.selectedApplicant?.username}</p>
            <p><strong>Status:</strong> {job.status}</p>

            {job.status === 'completed' && job.domFeedbackLeft === false ? (
              <button onClick={() => handleLeaveFeedback(job._id)}>Leave Feedback</button>
            ) : job.status === 'completed' && job.domFeedbackLeft === true ? (
              <p><em>✅ Feedback Submitted</em></p>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

export default DomActiveJobs;
