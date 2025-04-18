import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DomActiveJobs() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

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
        const filled = (data.jobs || []).filter(job =>
          job.status === 'filled' &&
          job.selectedApplicant &&
          job.completedOn == null
        );
        setJobs(filled);
      })
      .catch(() => setStatus('❌ Failed to load active jobs.'));
  }, []);

  return (
    <div>
      <h2>Active Jobs (Sub Selected)</h2>
      {status && <p>{status}</p>}

      {jobs.length === 0 ? (
        <p>No active jobs at the moment.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3><Link to={`/job/${job._id}`}>{job.title}</Link></h3>
            <p>{job.description}</p>
            <p>
              <strong>Selected Sub:</strong>{' '}
              {job.selectedApplicant?.username || 'Unknown'}
            </p>
            <p><strong>Status:</strong> {job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DomActiveJobs;
