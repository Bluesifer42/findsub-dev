// src/pages/AdminJobs.jsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAdminJobs, deleteJob } from '../utils/api';
import { useUser } from '../hooks/useUser';

function AdminJobs() {
  const { user, isAdmin, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) return navigate('/login');
      if (!isAdmin) {
        alert('Access denied. Admins only.');
        return navigate('/');
      }
    }
  }, [isLoading, isAdmin, isAuthenticated, navigate]);

  const fetchJobs = async () => {
    try {
      const { jobs } = await getAllAdminJobs();
      setJobs(jobs);
    } catch (err) {
      console.error(err);
      setStatus('Failed to load jobs.');
    }
  };

  useEffect(() => {
    if (isAdmin) fetchJobs();
  }, [isAdmin]);

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to permanently delete this job?')) return;

    try {
      await deleteJob(jobId);
      setStatus('✅ Job deleted.');
      fetchJobs();
    } catch (err) {
      console.error(err);
      setStatus(`❌ ${err.message || 'Failed to delete job.'}`);
    }
  };

  if (isLoading || !user) return <p className="text-center mt-4">Loading jobs...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin: Job Control Panel</h2>
      {status && <p className="mb-4">{status}</p>}

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="border-b border-gray-300">
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
            <tr key={job._id} className="border-b border-gray-200">
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
