// ====================================================================
// 📂 Full File Path & Name: src/dashboards/Admin/index.jsx
// 📌 Purpose: Admin dashboard interface to access user, job, feedback, and dev tools.
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin (enforced via isAdmin logic in useUser hook)
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /controllers/AdminController.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: Auth state, role check on load
// 🔁 Performs: Auth check and admin-only navigation rendering
// 🧪 Test Coverage: Manual testing only; integration test pending
// 🌐 Environment-Specific Logic: Client-only auth redirect
// ⚡ Performance Notes: Minimal render cost; limited DOM complexity

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

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

function AdminDashboard() {
  const { user, isAdmin, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) return navigate('/login');
      if (!isAdmin) {
        alert('Access denied. Admins only.');
        return navigate('/');
      }
    }
  }, [isLoading, isAdmin, isAuthenticated, navigate]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading admin panel...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Admin Control Panel</h2>
      <p className="mb-4">Welcome, {user.username}</p>

      <ul className="space-y-2 list-none">
        <li><Link className="text-blue-600 hover:underline" to="/admin/users">👤 Manage Users</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/jobs">📋 Manage Jobs</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/feedback">📝 Manage Feedback</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/kinks">🎭 Kink Manager</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/devtools">🧪 Dev Tools (Seeder & Purge)</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
