// src/pages/AwaitingFeedback.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AwaitingFeedback() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);

  // Load current user.
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Fetch jobs awaiting feedback for the current user.
  useEffect(() => {
    if (user) {
      // We assume an endpoint exists that returns jobs awaiting feedback.
      fetch(`http://localhost:5000/api/jobs/awaiting-feedback/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.jobs || []);
        })
        .catch((err) => {
          console.error('Error fetching awaiting feedback jobs:', err);
          setStatus('Failed to load jobs awaiting feedback.');
        });
    }
  }, [user]);

  return (
    <div>
      <h2>Jobs Awaiting Feedback</h2>
      {status && <p>{status}</p>}
      {jobs.length === 0 ? (
        <p>No jobs awaiting feedback.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>
              <Link to={`/job/${job._id}`}>{job.title}</Link>
            </h3>
            <p>
              <strong>Status:</strong> {job.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AwaitingFeedback;
