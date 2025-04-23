// /components/UserSidebar.jsx

import { Link } from 'react-router-dom';

function UserSidebar({ role }) {
  const base = `/dashboard/${role?.toLowerCase() || ''}`;

  return (
    <aside className="w-64 bg-gray-100 border-r min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li><Link to={base}>🏠 Dashboard</Link></li>
          <li><Link to="/register">📝 Register</Link></li>
          <li><Link to="/jobs">📋 Job Offers</Link></li>
          <li><Link to="/messages">💬 Messages</Link></li>
          <li><Link to="/profile">👤 Profile</Link></li>
          <li><Link to="/users">🔍 Find Members</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default UserSidebar;
