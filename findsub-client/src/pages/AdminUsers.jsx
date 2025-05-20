// ====================================================================
// 📂 Full File Path & Name: /src/pages/AdminUsers.jsx
// 📌 Purpose: Admin control panel to view, link to, and delete user accounts
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /routes/UsersRoutes.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: Load, delete button, role guard
// 🔁 Performs: getUsers, deleteUserById
// 🧪 Test Coverage: Phase 10 admin panel test, profile load test
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes: capped fetch (pagination optional later)

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

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUserById } from '@/utils/api';
import { useUser } from '@/hooks/useUser';
import ClickableUsername from '@/components/ClickableUsername';

function AdminUsers() {
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) return navigate('/login');
      if (user?.role !== 'Admin') {
        alert('Access denied. Admins only.');
        return navigate('/');
      }
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  const fetchUsers = async () => {
    try {
      const { users } = await getUsers();
      setUsers(users);
    } catch (err) {
      console.error('[AdminUsers] Failed to fetch users:', err);
      setStatus('❌ Failed to fetch users.');
    }
  };

  useEffect(() => {
    if (user?.role === 'Admin') fetchUsers();
  }, [user]);

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This cannot be undone.')) return;

    try {
      await deleteUserById(userId);
      setStatus('✅ User deleted.');
      fetchUsers();
    } catch (err) {
      console.error('[AdminUsers] Delete failed:', err);
      setStatus(`❌ ${err.message || 'Failed to delete user.'}`);
    }
  };

  if (isLoading || !user) return <p className="text-center mt-4">Loading users...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">🛠️ Admin: User Control Panel</h2>
      {status && <p className="mb-4 text-sm text-blue-600">{status}</p>}

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="py-2">Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Trust</th>
            <th>Rep</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b border-gray-200">
              <td className="py-1">
                <ClickableUsername user={u.sharedProfile ? { sharedProfile: u.sharedProfile } : undefined} />
              </td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.emailVerified ? '📧' : '—'}/
                {u.phoneVerified ? '📱' : '—'}
              </td>
              <td>{u.trustScore || 0}</td>
              <td>{u.reputationScore || 0}</td>
              <td>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="text-red-600 hover:underline"
                >
                  🗑️ Delete
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
