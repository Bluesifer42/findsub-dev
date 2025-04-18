import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SubJobHistory() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;

    const parsed = JSON.parse(stored);
    setUser(parsed);

    const userId = parsed._id || parsed.id;
    if (!userId || parsed.role !== 'Sub') return;

    fetch(`http://localhost:5000/api/jobs/history/${userId}`)
      .then(res => res.json())
      .then(data => {
        const finished = (data.jobs || []).filter(job =>
          job.selectedApplicant?._id === userId &&
          ['completed', 'failed'].includes(job.status)
        );
        setJobs(finished);
      })
      .catch(() => setStatus('❌ Failed to load job history.'));
  }, []);

  return (
    <div>
      <h2>Your Completed Jobs</h2>
      {status && <p>{status}</p>}

      {jobs.length === 0 ? (
        <p>You have no completed jobs yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3><Link to={`/job/${job._id}`}>{job.title}</Link></h3>
            <p>{job.description}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Posted by:</strong> {job.posterId?.username || 'Unknown'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SubJobHistory;
