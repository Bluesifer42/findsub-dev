// src/dashboards/Admin/index.jsx

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

function AdminDashboard() {
  const { user, isAdmin, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) return navigate('/login');
      if (!isAdmin) {
        alert('Access denied. Admins only.');
        return navigate('/');
      }
    }
  }, [isLoading, isAdmin, isAuthenticated, navigate]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading admin panel...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Admin Control Panel</h2>
      <p className="mb-4">Welcome, {user.username}</p>

      <ul className="space-y-2 list-none">
        <li><Link className="text-blue-600 hover:underline" to="/admin/users">👤 Manage Users</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/jobs">📋 Manage Jobs</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/feedback">📝 Manage Feedback</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/kinks">🎭 Kink Manager</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/devtools">🧪 Dev Tools (Seeder & Purge)</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
