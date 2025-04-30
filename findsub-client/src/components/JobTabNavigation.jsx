// File: /src/components/JobTabNavigation.jsx
// Purpose: Display tab navigation for Dom job management (My Listings, Applications, Active, History, Post)
// Standards:
// - Uses camelCase
// - Console logs for debug
// - React Router <Link> for SPA navigation
// - Responsive & modular

import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function JobTabNavigation() {
  const { user } = useUser();
  const location = useLocation();

  if (!user || user.role !== 'Dom') return null;

  const tabs = [
    { path: '/jobs', label: '🧱 Job Board' },
    { path: '/dom/listings', label: '📄 My Listings' },
    { path: '/dom/applications', label: '📬 Applications' },
    { path: '/dom/active', label: '⚙️ Active Jobs' },
    { path: '/dom/history', label: '📜 Job History' },
    { path: '/jobs/post', label: '➕ Post Job' }
  ];

  return (
    <div className="flex flex-wrap gap-4 my-4 border-b pb-2">
      {tabs.map(tab => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`px-4 py-2 rounded ${
            location.pathname === tab.path
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export default JobTabNavigation;
