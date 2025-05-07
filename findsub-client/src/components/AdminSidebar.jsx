// ====================================================================
// 📂 Full File Path & Name: /components/AdminSidebar.jsx
// 📌 Purpose: Sidebar navigation component for Admin users with working toggle collapse using Tailwind and React state
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: N/A
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Toggle button click
// 🔁 Performs: Renders sidebar and allows collapsing sidebar to icon-only view
// 🧪 Test Coverage: Manual QA; unit test wrapper TBD
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Stateless links, memoization not required

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

import { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`min-h-screen bg-gray-100 border-l p-4 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
    
      <button
        onClick={() => setIsCollapsed(prev => !prev)}
        aria-label="Toggle Sidebar"
        className="mb-6 text-xl font-bold hover:text-blue-600 focus:outline-none"
      >
        ☰
      </button>

      <nav>
        <ul className="space-y-3">
          <li>
            <Link to="/dashboard/admin" className="flex items-center space-x-2 hover:underline">
              <span>🏠</span>
              {!isCollapsed && <span>Admin Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="flex items-center space-x-2 hover:underline">
              <span>👤</span>
              {!isCollapsed && <span>Manage Users</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/jobs" className="flex items-center space-x-2 hover:underline">
              <span>📋</span>
              {!isCollapsed && <span>Manage Jobs</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/feedback" className="flex items-center space-x-2 hover:underline">
              <span>📝</span>
              {!isCollapsed && <span>Manage Feedback</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/kinks" className="flex items-center space-x-2 hover:underline">
              <span>🎭</span>
              {!isCollapsed && <span>Kink Manager</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/devtools" className="flex items-center space-x-2 hover:underline">
              <span>🧪</span>
              {!isCollapsed && <span>DevTools</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
