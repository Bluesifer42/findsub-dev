import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/login');
      return;
    }

    const parsed = JSON.parse(stored);
    if (!parsed.isAdmin) {
      alert("Access denied. Admins only.");
      navigate('/');
      return;
    }

    setUser(parsed);
  }, [navigate]);

  if (!user) return <p>Loading admin panel...</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>Admin Control Panel</h2>
      <p>Welcome, {user.username}</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/admin/users">👤 Manage Users</Link></li>
        <li><Link to="/admin/jobs">📋 Manage Jobs</Link></li>
        <li><Link to="/admin/feedback">📝 Manage Feedback</Link></li>
        <li><Link to="/admin/kinks">🎭 Kink Manager</Link></li>
        <li><Link to="/admin/devtools">🧪 Dev Tools (Seeder & Purge)</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
