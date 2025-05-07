// ====================================================================
// 📂 Full File Path & Name: src/pages/jobs/sub/SubApplicationsList.jsx
// 📌 Purpose: Display the list of job applications submitted by the Sub user.
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Sub
// 🔄 Related Backend Files: /routes/ApplicationRoutes.js, /controllers/ApplicationController.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: user change, isSub change
// 🔁 Performs: fetch applications for Sub, display jobs, allow inline view
// 🧪 Test Coverage: Integration tests pending
// 🌐 Environment-Specific Logic: Dev-only logging for console feedback
// ⚡ Performance Notes: Simple array mapping, no pagination, no memoization

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
// 🧰 Behavior Notes:
// - Flexible opt-in props (e.g., noPadding, fullWidth). Defaults enforce consistent layout unless explicitly overridden.
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// - DO NOT EDIT THIS SECTION ======================================

import { useEffect, useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { getApplicationsForUser } from '../../../utils/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import JobCard from '../../../components/jobs/JobCard';

function SubApplicationsList() {
  const { user, isSub, isLoading } = useUser();
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isSub) return;

    console.log('[SubApplicationsList] Fetching applications for user:', user._id);

    (async () => {
      try {
        const { applications } = await getApplicationsForUser(user._id);
        console.log('[SubApplicationsList] Applications fetched:', applications);
        setApplications(applications || []);
      } catch (err) {
        console.error('[SubApplicationsList] Error loading applications:', err);
        toast.error('Failed to load applications.');
        setStatus('❌ Failed to load applications.');
      }
    })();
  }, [user, isSub]);

  if (isLoading) return <p>Loading your applications...</p>;

  return (
    <>
      <h2 className="text-xl font-bold mb-4">My Applications</h2>
      {status && <p className="text-red-600">{status}</p>}
      {applications.length === 0 ? (
        <p>You haven’t applied to any jobs yet.</p>
      ) : (
        applications.map(app => (
          <div key={app._id}>
            <JobCard
              job={app.jobId}
              onClick={() => navigate(`/jobs/${app.jobId._id}`)}
            />
            <div className="mb-8 ml-2">
              <p><strong>Cover Letter:</strong> {app.coverLetter || '(none)'}</p>
              <p><strong>Status:</strong> {app.jobId.status}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default SubApplicationsList;
