// ====================================================================
// 📂 Full File Path & Name: /src/pages/jobs/dom/DomApplicationsList.jsx
// 📌 Purpose: Display a list of jobs posted by the Dom that have received applications.
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/ApplicationRoutes.js, /controllers/ApplicationController.js
// 👩‍👦  Is a child component : True/JobsHub
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: user auth + role resolution
// 🔁 Performs: Fetch Dom-owned jobs with applications
// 🧪 Test Coverage: Integration tests pending
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Stable layout; avoids early returns/jank

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
import { useUser } from '../../../hooks/useUser';
import { getJobsByPoster } from '../../../utils/api';
import LayoutWrapper from '../../../layout/LayoutWrapper';
import JobCard from '../../../components/jobs/JobCard';
import toast from 'react-hot-toast';

function DomApplicationsList() {
  const { user, isAuthenticated, isLoading, isDom } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !isAuthenticated || !isDom || !user) return;

    (async () => {
      try {
        const { jobs } = await getJobsByPoster(user._id);
        const jobsWithApplicants = jobs.filter(job => job.status === 'open');
        setJobs(jobsWithApplicants);
      } catch (err) {
        console.error('[DomApplicationsList] Error loading jobs:', err);
        toast.error('❌ Failed to load your listings');
      } finally {
        setLoading(false);
      }
    })();
  }, [isLoading, isAuthenticated, isDom, user]);

  if (isLoading || loading || !user) {
    return <p className="text-center mt-4">Loading your job applications...</p>;
  }

  return (
    <LayoutWrapper>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Jobs With Applications</h2>

        {jobs.length === 0 ? (
          <p>No job listings currently have applications.</p>
        ) : (
          jobs.map(job => (
            <JobCard
              key={job._id}
              job={job}
              onClick={() => navigate(`/jobs/${job._id}`)}
            />
          ))
        )}
      </div>
    </LayoutWrapper>
  );
}

export default DomApplicationsList;
