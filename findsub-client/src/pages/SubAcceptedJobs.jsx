import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SubAcceptedJobs() {
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

    fetch(`http://localhost:5000/api/my-jobs/${userId}`)
      .then(res => res.json())
      .then(data => {
        const active = (data.jobs || []).filter(job =>
          job.status === 'filled' &&
          job.completedOn == null &&
          job.selectedApplicant?._id === userId
        );
        setJobs(active);
      })
      .catch(() => setStatus('❌ Failed to load accepted jobs.'));
  }, []);

  return (
    <div>
      <h2>Accepted Jobs</h2>
      {status && <p>{status}</p>}

      {jobs.length === 0 ? (
        <p>You haven’t been selected for any active jobs yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3><Link to={`/job/${job._id}`}>{job.title}</Link></h3>
            <p>{job.description}</p>
            <p>
              <strong>Posted by:</strong>{' '}
              <Link to={`/profile/${job.posterId._id}`}>{job.posterId.username}</Link>
            </p>
            <p><strong>Status:</strong> {job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SubAcceptedJobs;
