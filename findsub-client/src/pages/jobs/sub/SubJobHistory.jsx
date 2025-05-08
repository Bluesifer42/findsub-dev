// ====================================================================
// 📂 Full File Path & Name: /src/pages/SubJobHistory.jsx
// 📌 Purpose: Display historical/completed jobs for Sub users.
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Sub
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: component mount
// 🔁 Performs: fetch job history for Sub, filter completed/failed
// 🧪 Test Coverage: Integration tests pending
// 🌐 Environment-Specific Logic: Uses localStorage fallback for auth context
// ⚡ Performance Notes: Minimal — renders static job list once loaded

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
import JobCard from "../../../components/jobs/JobCard";

function SubJobHistory() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;

    const parsed = JSON.parse(stored);
    setUser(parsed);

    const userId = parsed._id || parsed.id;
    if (!userId || parsed.role !== 'Sub') return;

    fetch(`http://localhost:5000/api/jobs/history/${userId}`)
      .then(res => res.json())
      .then(data => {
        const finishedJobs = (data.jobs || []).filter(job =>
          job.selectedApplicant?._id === userId &&
          ['completed', 'failed'].includes(job.status)
        );
        setJobs(finishedJobs);
      })
      .catch(() => setStatus('❌ Failed to load job history.'));
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Your Completed Jobs</h2>
      {status && <p className="text-red-600">{status}</p>}
      {jobs.length === 0 ? (
        <p>You have no completed jobs yet.</p>
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

export default SubJobHistory;
