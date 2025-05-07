// ====================================================================
// 📂 Full File Path & Name: /src/components/JobTabNavigation.jsx
// 📌 Purpose: Dom-only tab navigation for legacy job pages (deprecated in favor of JobsHub)
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: None (frontend-only legacy)
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Render on route change or login
// 🔁 Performs: Conditional tab rendering for job routes
// 🧪 Test Coverage: Manual QA only; legacy fallback
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes: Stateless render, lightweight mapping

// - DO NOT EDIT THIS SECTION ======================================

// 📦 Data Shape:
// - Incoming API payloads: camelCase
// - MongoDB schema fields: snake_case
// - Internal React state/props/vars: camelCase
// - Kink references: ObjectId for DB queries; { _id, name, description } for UI display
//
// 🎯 Casing Conventions:
// - MongoDB Collection Fields: snake_case
// - Mongoose Model Fields: snake_case
// - API Request/Response Payloads: camelCase
// - JavaScript Variables & Functions: camelCase
// - React Components: PascalCase
// - CSS Classnames (Tailwind/Custom): kebab-case
//
// ❗ Error Handling Strategy:
// - Uses toast for user-visible errors (via react-hot-toast or react-toastify)
// - Logs errors to console: `[FileName:FunctionName] Error: [message], Payload: [payload]`
// - Avoids alert()/prompt() except in critical cases with justification
//
// 📍 Navigation Standards:
// - React Router <Link> for internal routing
// - Direct route changes use navigate('/path')
//
// 🧪 Testing/Debugging Aids:
// - Console logs: `[FileName DEBUG] [message]`
// - Logs API payloads/responses in development only
//
// 🚨 ESLint / Prettier:
// - Adheres to airbnb style, indentation: 2 spaces (no tabs)
// - Exceptions: `// eslint-disable-line [rule] - [reason]`
//
// 🔒 Security Notes:
// - Sanitizes inputs via `sanitize-html`
// - Prevents XSS via Helmet middleware
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// - DO NOT EDIT THIS SECTION ======================================

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
