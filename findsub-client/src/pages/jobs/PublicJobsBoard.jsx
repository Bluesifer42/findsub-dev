// ====================================================================
// 📂 Full File Path & Name: src/pages/jobs/PublicJobsBoard.jsx
// 📌 Purpose: Public board for all job listings visible to Subs and Switches; shows status, feedback, and apply button.
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch | Any
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : True/JobsHub
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: component mount, feedback toggle, apply form
// 🔁 Performs: fetch all jobs, apply to job, view feedback
// 🧪 Test Coverage: Manual QA only, integration pending
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes: Simple render, paginates client-side in future

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
// - Use <Link> for static in-app navigation (e.g., navbars, sidebars)
// - Use navigate('/path') for dynamic redirection (e.g., after logout or submit)
// - Use <Outlet /> inside wrapper layouts (e.g., JobsHub) to render nested child routes contextually
//
// 🧭 Parent/Child Layout Standards:
// - All child pages must wrap content using <LayoutWrapper><div className="page-container">...</div></LayoutWrapper>
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
//
// 🔁 API Integration:
// - All calls made via centralized api.js
// - Raw data returned, transformed only in consuming component
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
import { useUser } from '../../hooks/useUser';
import { getAllJobs, getFeedbackForJob, applyToJob } from '../../utils/api';
import { toast } from 'react-toastify';
import JobCard from '../../components/jobs/JobCard';
import LayoutWrapper from '../../layout/LayoutWrapper';

function PublicJobsBoard() {
  const { user, isLoading } = useUser();
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const [feedbackMap, setFeedbackMap] = useState({});
  const [visibleFeedbackJobIds, setVisibleFeedbackJobIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { jobs: fetchedJobs } = await getAllJobs();
        setJobs(Array.isArray(fetchedJobs) ? fetchedJobs : []);
      } catch (err) {
        console.error('[PublicJobsBoard] ❌ Failed to fetch jobs:', err);
        setStatus('❌ Failed to load jobs.');
        toast.error('Failed to load jobs.');
      }
    })();
  }, []);

  const toggleFeedback = async (jobId) => {
    const isVisible = visibleFeedbackJobIds.includes(jobId);
    if (!isVisible && !feedbackMap[jobId]) {
      try {
        const { feedback } = await getFeedbackForJob(jobId);
        setFeedbackMap(prev => ({ ...prev, [jobId]: feedback }));
      } catch (err) {
        toast.error('Could not load feedback.');
      }
    }
    setVisibleFeedbackJobIds(prev =>
      isVisible ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApply = async (jobId) => {
    try {
      const cover = prompt('Optional: Add a message (or leave blank):');
      if (cover === null) return;
      await applyToJob({
        jobId,
        applicantId: user._id || user.id,
        coverLetter: cover.trim(),
      });
      toast.success('✅ Application submitted!');
    } catch (err) {
      toast.error(err.message || 'Failed to apply.');
    }
  };

  if (isLoading) return <p>Loading jobs...</p>;

  return (
    <LayoutWrapper>
      <div className="page-container">
        <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>
        {status && <p className="text-red-600">{status}</p>}
        {jobs.length === 0 && !status && <p>No jobs currently posted.</p>}

        {jobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            user={user}
            feedback={feedbackMap[job._id]}
            showFeedback={visibleFeedbackJobIds.includes(job._id)}
            onToggleFeedback={() => toggleFeedback(job._id)}
            onApply={() => handleApply(job._id)}
            onClick={() => navigate(`/jobs/${job._id}`)}
          />
        ))}
      </div>
    </LayoutWrapper>
  );
}

export default PublicJobsBoard;
