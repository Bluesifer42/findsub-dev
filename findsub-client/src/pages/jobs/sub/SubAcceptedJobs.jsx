// ====================================================================
// 📂 Full File Path & Name: src/pages/jobs/sub/SubAcceptedJobs.jsx
// 📌 Purpose: Displays jobs the logged-in Sub has been selected for and tracks feedback status.
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Sub
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: user login state, component mount
// 🔁 Performs: fetch filled jobs for sub, shows feedback CTA
// 🧪 Test Coverage: Manual testing only, integration test pending
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes: Lightweight filtering, no pagination

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
import { getFilledJobs } from '../../../utils/api';
import { toast } from 'react-toastify';
import JobCard from '../../../components/jobs/JobCard';

function SubAcceptedJobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      console.warn('⚠️ [SubAcceptedJobs] No user in localStorage');
      return;
    }

    const parsed = JSON.parse(stored);
    setUser(parsed);

    (async () => {
      try {
        const { jobs: filledJobs } = await getFilledJobs(parsed._id);
        console.log('[SubAcceptedJobs] Fetched filled jobs:', filledJobs);

        const active = filledJobs.filter(job =>
          job.status === 'filled' ||
          (job.status === 'completed' && job.subFeedbackLeft === false)
        );

        setJobs(active);
      } catch (err) {
        console.error('❌ [SubAcceptedJobs] Error fetching filled jobs:', err);
        setStatus('❌ Failed to load your jobs.');
        toast.error('Failed to load accepted jobs');
      }
    })();
  }, []);

  const handleFeedback = (jobId, toUserId) => {
    navigate(`/feedback/${jobId}/${toUserId}`);
  };

  if (!user) return <p className="text-center mt-4">Loading user...</p>;

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Your Active Jobs</h2>

      {status && <p className="text-red-600">{status}</p>}

      {jobs.length === 0 ? (
        <p>No active jobs at the moment.</p>
      ) : (
        jobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            onClick={() => navigate(`/jobs/${job._id}`)}
            extra={
              job.status === 'completed' && !job.subFeedbackLeft ? (
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeedback(job._id, job.posterId?._id);
                  }}
                >
                  Leave Feedback
                </button>
              ) : job.status === 'completed' && job.subFeedbackLeft ? (
                <p className="text-green-600 mt-2"><em>✅ Feedback Submitted</em></p>
              ) : null
            }
          />
        ))
      )}
    </>
  );
}

export default SubAcceptedJobs;
