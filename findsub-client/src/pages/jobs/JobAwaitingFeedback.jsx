// ====================================================================
// 📂 Full File Path & Name: /src/pages/jobs/JobAwaitingFeedback.jsx
// 📌 Purpose: Display list of jobs the user has completed but has not yet left feedback on
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: user state load, auth check
// 🔁 Performs: fetch jobs awaiting feedback for user
// 🧪 Test Coverage: Integration tests pending
// 🌐 Environment-Specific Logic: Dev-only logging for debugging fetch
// ⚡ Performance Notes: Lightweight view; no pagination required

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
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobsAwaitingFeedback } from '../../utils/api';
import { useUser } from '../../hooks/useUser';

function JobAwaitingFeedback() {
  const { user, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.warn('[JobAwaitingFeedback] User not authenticated, redirecting to login');
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        console.log('[JobAwaitingFeedback] Fetching jobs awaiting feedback for user:', user.id);
        const { jobs } = await getJobsAwaitingFeedback(user.id);
        setJobs(jobs || []);
        console.log('[JobAwaitingFeedback] Jobs received:', jobs);
      } catch (err) {
        console.error('[JobAwaitingFeedback] Error fetching jobs:', err);
        setStatus('Failed to load jobs awaiting feedback.');
      }
    })();
  }, [user]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading feedback queue...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Jobs Awaiting Feedback</h2>
      {status && <p className="text-red-600 mb-2">{status}</p>}

      {jobs.length === 0 ? (
        <p>No jobs awaiting feedback.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="border p-4 mb-4 rounded shadow-sm">
            <h3 className="font-semibold text-lg">
              <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline">
                {job.title}
              </Link>
            </h3>
            <p><strong>Status:</strong> {job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default JobAwaitingFeedback;
