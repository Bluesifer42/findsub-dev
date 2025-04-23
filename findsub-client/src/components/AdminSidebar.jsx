// /components/AdminSidebar.jsx

import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-100 border-r px-4 py-6">
      <button
        aria-label="Toggle Sidebar"
        className="mb-4 text-xl font-bold hover:text-blue-600 focus:outline-none"
      >
        ☰
      </button>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard/admin" className="block hover:underline text-blue-700 font-semibold">
              🏠 Admin Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="block hover:underline">
              👤 Manage Users
            </Link>
          </li>
          <li>
            <Link to="/admin/jobs" className="block hover:underline">
              📋 Manage Jobs
            </Link>
          </li>
          <li>
            <Link to="/admin/feedback" className="block hover:underline">
              📝 Manage Feedback
            </Link>
          </li>
          <li>
            <Link to="/admin/kinks" className="block hover:underline">
              🎭 Kink Manager
            </Link>
          </li>
          <li>
            <Link to="/admin/devtools" className="block hover:underline">
              🧪 DevTools
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
