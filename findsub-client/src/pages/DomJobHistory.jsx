import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DomJobHistory() {
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

    fetch(`http://localhost:5000/api/jobs/history/${userId}`)
      .then(res => res.json())
      .then(data => {
        const finished = (data.jobs || []).filter(job =>
          job.posterId._id === userId &&
          ['completed', 'failed'].includes(job.status)
        );
        setJobs(finished);
      })
      .catch(() => setStatus('❌ Failed to load job history.'));
  }, []);

  return (
    <div>
      <h2>Job History (Posted by You)</h2>
      {status && <p>{status}</p>}

      {jobs.length === 0 ? (
        <p>No completed or failed jobs yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3><Link to={`/job/${job._id}`}>{job.title}</Link></h3>
            <p>{job.description}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Selected Sub:</strong> {job.selectedApplicant?.username || 'N/A'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DomJobHistory;
