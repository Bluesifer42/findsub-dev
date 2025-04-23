import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');

  const fetchUsers = async (role = '') => {
    try {
      const query = role ? `?role=${role}` : '';
      const res = await fetch(`http://localhost:5000/api/users${query}`);
      const data = await res.json();
      setUsers(data.users || []);
      setStatus('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilter = (role) => {
    setFilter(role);
    fetchUsers(role);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Find Members</h2>

      <div className="mb-4 flex gap-2">
        <button onClick={() => handleFilter('')} className="btn">All</button>
        <button onClick={() => handleFilter('Sub')} className="btn">Subs</button>
        <button onClick={() => handleFilter('Switch')} className="btn">Switches</button>
        <button onClick={() => handleFilter('Dom')} className="btn">Doms</button>
      </div>

      {status && <p className="text-red-600">{status}</p>}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map(user => (
          <div key={user._id} className="border-b py-2">
            <p>
              <Link to={`/profile/${user._id}`} className="font-semibold text-blue-600 hover:underline">
                {user.username}
              </Link>{' '}
              {user.reputationScore && (
                <>({user.reputationScore.toFixed(1)} / 5)</>
              )}{' '}
              <em className="text-gray-500">{user.role}</em>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserDirectory;
