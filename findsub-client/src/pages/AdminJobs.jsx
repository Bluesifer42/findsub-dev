import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

  const fetchJobs = () => {
    fetch('http://localhost:5000/api/admin/jobs')
      .then(res => res.json())
      .then(data => setJobs(data.jobs))
      .catch(() => setStatus('Failed to load jobs.'));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to permanently delete this job?')) return;

    const res = await fetch(`http://localhost:5000/api/admin/jobs/${jobId}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('Job deleted.');
      fetchJobs(); // Refresh list
    } else {
      setStatus(data.message || 'Failed to delete job.');
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h2>Admin: Job Control Panel</h2>
      {status && <p>{status}</p>}

      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Poster</th>
            <th>Status</th>
            <th>Selected</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job._id} style={{ borderBottom: '1px solid #ccc' }}>
              <td><Link to={`/job/${job._id}`}>{job.title}</Link></td>
              <td><Link to={`/profile/${job.posterId?._id}`}>{job.posterId?.username}</Link></td>
              <td>{job.status}</td>
              <td>{job.selectedApplicant?.username || '—'}</td>
              <td>{new Date(job.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(job._id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobs;
