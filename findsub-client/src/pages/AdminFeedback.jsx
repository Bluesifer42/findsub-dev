// src/pages/AdminFeedback.jsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllFeedback } from '../utils/api';
import { useUser } from '../hooks/useUser';

function AdminFeedback() {
  const { user, isAdmin, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState([]);
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

  useEffect(() => {
    if (!isAdmin) return;

    (async () => {
      try {
        const { feedback } = await getAllFeedback();
        setFeedback(feedback);
      } catch (err) {
        console.error(err);
        setStatus('Failed to load feedback.');
      }
    })();
  }, [isAdmin]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading feedback...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin: All Feedback</h2>
      {status && <p className="text-red-600">{status}</p>}

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="border-b border-gray-300">
            <th>From</th>
            <th>To</th>
            <th>Job</th>
            <th>Honesty</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map(fb => (
            <tr key={fb._id} className="border-b border-gray-200">
              <td>
                <Link to={`/profile/${fb.fromUser?._id}`}>
                  {fb.fromUser?.username || '—'}
                </Link>
              </td>
              <td>
                <Link to={`/profile/${fb.toUser?._id}`}>
                  {fb.toUser?.username || '—'}
                </Link>
              </td>
              <td>
                <Link to={`/job/${fb.jobId?._id}`}>
                  {fb.jobId?.title || '—'}
                </Link>
              </td>
              <td>{fb.honestyScore ?? '—'}</td>
              <td>{fb.comment || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminFeedback;
