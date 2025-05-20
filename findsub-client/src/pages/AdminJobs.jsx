// ====================================================================
// 📂 Full File Path & Name: /src/pages/AdminJobs.jsx
// 📌 Purpose: Admin-only panel to list, review, and delete jobs across the platform
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /controllers/JobsController.js
// 👩‍👦  Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: On load, after deletion
// 🔁 Performs: getAllAdminJobs, deleteJob
// 🧪 Test Coverage: Pending admin integration test suite
// 🌐 Environment-Specific Logic: Admin guard enforced via user.role
// ⚡ Performance Notes: Table unpaginated; may require cap later for large sites

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
import { Link, useNavigate } from 'react-router-dom';
import { getAllAdminJobs, deleteJob } from '@/utils/api';
import { useUser } from '@/hooks/useUser';

function AdminJobs() {
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
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

  const fetchJobs = async () => {
    try {
      const { jobs } = await getAllAdminJobs();
      setJobs(jobs);
    } catch (err) {
      console.error('[AdminJobs] Failed to fetch jobs:', err);
      setStatus('❌ Failed to load jobs.');
    }
  };

  useEffect(() => {
    if (user?.role === 'Admin') fetchJobs();
  }, [user]);

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to permanently delete this job?')) return;

    try {
      await deleteJob(jobId);
      setStatus('✅ Job deleted.');
      fetchJobs();
    } catch (err) {
      console.error('[AdminJobs] Delete failed:', err);
      setStatus(`❌ ${err.message || 'Failed to delete job.'}`);
    }
  };

  if (isLoading || !user) return <p className="text-center mt-4">Loading jobs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">🧩 Admin: Job Control Panel</h2>
      {status && <p className="mb-4 text-sm">{status}</p>}

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-300 text-left">
            <th className="py-2">Title</th>
            <th>Poster</th>
            <th>Status</th>
            <th>Selected</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job._id} className="border-b border-gray-200">
              <td>
                <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline">
                  {job.title}
                </Link>
              </td>
              <td>
                <Link to={`/profile/${job.posterId?._id}`} className="text-blue-600 hover:underline">
                  {job.posterId?.username || '—'}
                </Link>
              </td>
              <td>{job.status}</td>
              <td>{job.selectedApplicant?.username || '—'}</td>
              <td>{new Date(job.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleDelete(job._id)}
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

export default AdminJobs;
