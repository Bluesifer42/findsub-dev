// ====================================================================
// 📂 Full File Path & Name: src/dashboards/Admin/index.jsx
// 📌 Purpose: Admin dashboard interface to access user, job, feedback, and dev tools
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin (enforced via user.role === 'Admin')
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /controllers/AdminController.js
// 👩‍👦  Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: Auth state, role check on load
// 🔁 Performs: Auth check and admin-only navigation rendering
// 🧪 Test Coverage: Manual testing only; integration test pending
// 🌐 Environment-Specific Logic: Client-only auth redirect
// ⚡ Performance Notes: Minimal render cost; limited DOM complexity

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================
//
// 📦 Data Shape:
// - Incoming API payloads: camelCase
// - MongoDB schema fields: snake_case
// - Internal React state/props/vars: camelCase
// - Kink references: ObjectId for DB queries; { _id, name, description } for UI display
// - Admins use `adminProfileId` (ref: AdminProfile)
// - Admins may include `permissions: [String]`, `isOwner: Boolean`, `isProtected: Boolean`
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
// - Use <Link> for static in-app navigation (e.g., navbars, sidebars)
// - Use navigate('/path') for dynamic redirection (e.g., after logout or submit)
// - Use <Outlet /> inside wrapper layouts (e.g., JobsHub) to render nested child routes contextually
//
// 🧭 Parent/Child Layout Standards:
// - All child pages must wrap content using <LayoutWrapper><div className="max-w-6xl mx-auto">...</div></LayoutWrapper>
// - Child pages must not define layout independently; spacing, width, and behavior are inherited from parent.
// - Use `// 👩‍👦 Is a child component : True/[ParentPageName]` to explicitly document layout hierarchy.
//
// 🧱 Responsive & Layout Standards:
// - All pages except auth use <LayoutWrapper> for consistent page sizing, scroll control, and sidebar injection
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
// - Sanitizes user input via sanitize-html (frontend) and express-validator (backend)
// - Prevents XSS via Helmet middleware
// - Admins cannot be created via public signup
// - Destructive actions on admin accounts require permission flags or isOwner=true
//
// 🔁 API Integration:
// - All calls made via centralized api.js
// - Raw data returned, transformed only in consuming component
// - Admin actions must verify `role === 'Admin'` and proper `permissions[]`
//
// 🧰 Behavior Notes:
// - Flexible opt-in props (e.g., noPadding, fullWidth). Defaults enforce consistent layout unless explicitly overridden.
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
// - Admin dashboards, tables, and forms must meet same accessibility standards
//
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
// - Admin checks (e.g. isSuperAdmin, hasPermission) live in /utils/adminCheck.js
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) return navigate('/login');
      if (user?.role !== 'Admin') {
        alert('Access denied. Admins only.');
        return navigate('/');
      }
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading admin panel...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Admin Control Panel</h2>
      <p className="mb-4">Welcome, {user.username}</p>

      <ul className="space-y-2 list-none">
        <li><Link className="text-blue-600 hover:underline" to="/admin/users">👥 Accounts Management</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/jobs">📋 Manage Jobs</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/feedback">📝 Manage Feedback</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/kinks">🎭 Kink Manager</Link></li>
        <li><Link className="text-blue-600 hover:underline" to="/admin/devtools">🧪 Dev Tools (Seeder & Purge)</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
