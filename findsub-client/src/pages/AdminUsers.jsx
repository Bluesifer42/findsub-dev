import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data.users))
      .catch(err => {
        console.error(err);
        setStatus('Failed to load users.');
      });
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/delete-user/${userId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => prev.filter(u => u._id !== userId));
        setStatus(`User deleted: ${data.username}`);
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('Error deleting user.');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2>Admin: Manage Users</h2>
      {status && <p>{status}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Reputation</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} style={{ borderBottom: '1px solid #ccc' }}>
              <td><Link to={`/profile/${user._id}`}>{user.username}</Link></td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.reputationScore || '—'}</td>
              <td>{user.isAdmin ? '✅' : '—'}</td>
              <td>
                <button onClick={() => handleDelete(user._id)} style={{ color: 'red' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
