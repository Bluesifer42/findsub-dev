import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/feedback')
      .then(res => res.json())
      .then(data => setFeedback(data.feedback))
      .catch(() => setStatus('Failed to load feedback.'));
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h2>Admin: All Feedback</h2>
      {status && <p>{status}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Job</th>
            <th>Honesty</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map(fb => (
            <tr key={fb._id} style={{ borderBottom: '1px solid #ccc' }}>
              <td><Link to={`/profile/${fb.fromUser?._id}`}>{fb.fromUser?.username || '—'}</Link></td>
              <td><Link to={`/profile/${fb.toUser?._id}`}>{fb.toUser?.username || '—'}</Link></td>
              <td><Link to={`/job/${fb.jobId?._id}`}>{fb.jobId?.title || '—'}</Link></td>
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
