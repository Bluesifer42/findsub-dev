// ====================================================================
// 📂 Full File Path & Name: src/pages/jobs/dom/DomJobHistory.jsx
// 📌 Purpose: Display all jobs posted by the Dom that have been completed or failed
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: user load, component mount
// 🔁 Performs: fetch historical jobs posted by the current Dom
// 🧪 Test Coverage: Manual dev testing; unit tests pending
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes: Light component; filters already retrieved data client-side

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
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { getDomJobHistory } from '../../../utils/api';
import JobCard from '../../../components/jobs/JobCard';

function DomJobHistory() {
  const { user, isDom, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isDom)) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, isDom, navigate]);

  useEffect(() => {
    if (!user || !isDom) return;

    (async () => {
      try {
        const { jobs: all } = await getDomJobHistory(user._id || user.id);
        const finished = (all || []).filter(job =>
          (job.posterId === user._id || job.posterId?._id === user._id) &&
          ['completed', 'failed'].includes(job.status)
        );
        setJobs(finished);
      } catch (err) {
        console.error('[DomJobHistory] Failed to load jobs:', err);
        setStatus('❌ Failed to load job history.');
      }
    })();
  }, [user, isDom]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading job history...</p>;

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Job History (Posted by You)</h2>
      {status && <p className="text-red-600">{status}</p>}

      {jobs.length === 0 ? (
        <p>No completed or failed jobs yet.</p>
      ) : (
        jobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            onClick={() => navigate(`/jobs/${job._id}`)}
          />
        ))
      )}
    </>
  );
}

export default DomJobHistory;
