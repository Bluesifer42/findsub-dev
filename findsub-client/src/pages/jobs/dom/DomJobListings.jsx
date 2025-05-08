// ====================================================================
// 📂 Full File Path & Name: src/pages/jobs/dom/DomJobListings.jsx
// 📌 Purpose: Display the Dom's unfilled job listings and allow edits or detail viewing.
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : True/JobsHub
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: component mount, user load
// 🔁 Performs: fetch jobs posted by this Dom, filters unfilled, triggers detail view or navigation
// 🧪 Test Coverage: Integration tests pending
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes: Filters on client; safe for current volume

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
// - Sanitizes inputs via sanitize-html (frontend) and express-validator (backend)
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
import JobCard from '../../../components/jobs/JobCard';
import LayoutWrapper from '../../../layout/LayoutWrapper';

function DomJobListings() {
  const { user, isDom, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!user || !isDom) return;

    console.log('[DomJobListings] Fetching jobs for poster ID:', user._id);

    (async () => {
      try {
        const { jobs: all } = await getJobsByPoster(user._id || user.id);
        const unfilled = Array.isArray(all)
          ? all.filter(job =>
              job.status === 'open' &&
              !job.selectedApplicant &&
              (
                job.posterId === user._id ||
                job.posterId?._id === user._id
              )
            )
          : [];

        console.log(`[DomJobListings] Unfilled listings: ${unfilled.length}`, unfilled);
        setJobs(unfilled);
      } catch (err) {
        console.error('[DomJobListings] Failed to load listings:', err);
      }
    })();
  }, [user, isDom]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading your listings...</p>;

  return (
    <LayoutWrapper>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">My Unfilled Listings</h2>

        {jobs.length === 0 ? (
          <p>You don’t have any open, unfilled jobs right now.</p>
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

export default DomJobListings;
