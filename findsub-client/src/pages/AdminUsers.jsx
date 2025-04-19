import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');

  const fetchUsers = () => {
    fetch('http://localhost:5000/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data.users))
      .catch(() => setStatus('Failed to fetch users.'));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This cannot be undone.')) return;

    const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('User deleted.');
      fetchUsers();
    } else {
      setStatus(data.message || 'Failed to delete user.');
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h2>Admin: User Control Panel</h2>
      {status && <p>{status}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
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
            <tr key={user._id} style={{ borderBottom: '1px solid #ccc' }}>
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
