import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function JobHistory() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      fetch(`http://localhost:5000/api/jobs/history/${parsed.id}`)
        .then(res => res.json())
        .then(data => setJobs(data.jobs))
        .catch(() => setStatus('❌ Failed to load job history.'));
    }
  }, []);

  return (
    <div>
      <h2>Job History</h2>
      {status && <p>{status}</p>}
      {!status && jobs.length === 0 && <p>No jobs completed or marked yet.</p>}

      {jobs.map(job => (
        <div key={job._id} style={{ border: '1px solid #555', marginBottom: '1rem', padding: '1rem' }}>
          <h3>{job.title}</h3>
          <p><strong>Posted by:</strong> <Link to={`/profile/${job.posterId._id}`}>{job.posterId.username}</Link></p>
          {job.selectedApplicant && (
            <p><strong>Accepted by:</strong> <Link to={`/profile/${job.selectedApplicant._id}`}>{job.selectedApplicant.username}</Link></p>
          )}
          <p><strong>Fulfilled on:</strong> {job.fulfilledOn ? new Date(job.fulfilledOn).toLocaleDateString() : '—'}</p>
          <p><strong>Status:</strong> {job.isFilled ? 'Completed or Filled' : 'Unknown'}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Compensation:</strong> {job.compensation}</p>
        </div>
      ))}
    </div>
  );
}

export default JobHistory;
