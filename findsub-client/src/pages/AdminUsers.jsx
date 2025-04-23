// src/pages/AdminUsers.jsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminUsers, deleteUserById } from '../utils/api';
import { useUser } from '../hooks/useUser';

function AdminUsers() {
  const { user, isAdmin, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
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

  const fetchUsers = async () => {
    try {
      const { users } = await getAdminUsers();
      setUsers(users);
    } catch (err) {
      console.error(err);
      setStatus('Failed to fetch users.');
    }
  };

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This cannot be undone.')) return;

    try {
      await deleteUserById(userId);
      setStatus('✅ User deleted.');
      fetchUsers();
    } catch (err) {
      setStatus(`❌ ${err.message || 'Failed to delete user.'}`);
    }
  };

  if (isLoading || !user) return <p className="text-center mt-4">Loading users...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin: User Control Panel</h2>
      {status && <p className="mb-4">{status}</p>}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Admin?</th>
            <th>Verified</th>
            <th>Trust</th>
            <th>Rep</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b border-gray-200">
              <td><Link to={`/profile/${user._id}`}>{user.username}</Link></td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isAdmin ? '✅' : '—'}</td>
              <td>
                {user.emailVerified ? '📧' : '—'}/
                {user.phoneVerified ? '📱' : '—'}
              </td>
              <td>{user.trustScore}</td>
              <td>{user.reputationScore}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
