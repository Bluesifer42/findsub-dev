// ====================================================================
// 📂 Full File Path & Name: /src/dashboards/Admin/AdminDirectory.jsx
// 📌 Purpose: Displays list of admin accounts to other admins with role, contact, and profile access
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin only
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /controllers/AdminController.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: Load, isAdmin check
// 🔁 Performs: fetch admin list
// 🧪 Test Coverage: None yet (covered in admin visibility phase)
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes: None

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
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { getAdmins } from '@/utils/api';
import LayoutWrapper from '@/components/LayoutWrapper';

function AdminDirectory() {
  const { user, isAuthenticated, role, isLoading } = useUser();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || role !== 'Admin') {
        navigate('/login');
      }
    }
  }, [isAuthenticated, role, isLoading, navigate]);

  const fetchAdmins = async () => {
    try {
      const { admins } = await getAdmins(); // expects [{ _id, username, email, adminProfile }]
      setAdmins(admins || []);
    } catch (err) {
      console.error('[AdminDirectory] Fetch failed:', err);
      setStatus('❌ Failed to load admins.');
    }
  };

  useEffect(() => {
    if (role === 'Admin') fetchAdmins();
  }, [role]);

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">📒 Admin Directory</h2>
        {status && <p className="text-red-600">{status}</p>}

        {admins.length === 0 ? (
          <p>No admins found.</p>
        ) : (
          admins.map(admin => (
            <div key={admin._id} className="border-b py-2 text-sm">
              <p className="font-semibold text-blue-600">{admin.username}</p>
              {admin.adminProfile?.contactEmail && (
                <p>Email: <a href={`mailto:${admin.adminProfile.contactEmail}`} className="text-blue-500 underline">{admin.adminProfile.contactEmail}</a></p>
              )}
              {admin.adminProfile?.contactPhone && (
                <p>Phone: {admin.adminProfile.contactPhone}</p>
              )}
              {admin.adminProfile?.bio && (
                <p className="text-gray-600 italic">“{admin.adminProfile.bio}”</p>
              )}
            </div>
          ))
        )}
      </div>
    </LayoutWrapper>
  );
}

export default AdminDirectory;
