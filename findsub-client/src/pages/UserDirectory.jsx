import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');

  const fetchUsers = async (role = '') => {
    const query = role ? `?role=${role}` : '';
    const res = await fetch(`http://localhost:5000/api/users${query}`);
    const data = await res.json();
    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilter = (role) => {
    setFilter(role);
    fetchUsers(role);
  };

  return (
    <div>
      <h2>Find Members</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => handleFilter('')}>All</button>
        <button onClick={() => handleFilter('Sub')}>Subs</button>
        <button onClick={() => handleFilter('Switch')}>Switches</button>
        <button onClick={() => handleFilter('Dom')}>Doms</button>
      </div>

      {status && <p>{status}</p>}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map(user => (
          <div key={user._id} style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <p>
            <Link to={`/profile/${user._id}`}>
                <strong>{user.username}</strong>
            </Link>
            {user.reputationScore && (
                <> ({user.reputationScore.toFixed(1)} / 5)</>
            )}
            {' '}<em>{user.role}</em>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserDirectory;
