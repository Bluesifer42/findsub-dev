import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function JobHistory() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);

  // Load current user from localStorage.
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Fetch completed jobs for the current user.
  useEffect(() => {
    if (user) {
      const userId = user.id || user._id;
      fetch(`http://localhost:5000/api/jobs/history/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setJobs(data.jobs || []);
        })
        .catch((err) => {
          console.error('Error fetching job history:', err);
          setStatus('❌ Failed to load job history.');
        });
    }
  }, [user]);

  return (
    <div>
      <h2>Job History</h2>
      {status && <p>{status}</p>}
      {jobs.length === 0 ? (
        <p>No completed jobs to display.</p>
      ) : (
        <div>
          {jobs.map((job) => (
            <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h3>
                <Link to={`/job/${job._id}`}>{job.title}</Link>
              </h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <p>
                <strong>Completed On:</strong> {job.completedOn ? new Date(job.completedOn).toLocaleDateString() : 'N/A'}
              </p>
              {/* Optionally add more details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobHistory;
