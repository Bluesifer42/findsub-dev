// ====================================================================
// 📂 Full File Path & Name: src/components/jobs/JobCard.jsx
// 📌 Purpose: Reusable styled card component for rendering any job listing.
// 🧩 File Type: React Component
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any (Dom | Sub | Switch)
// 🔄 Related Backend Files: None
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Manual usage inside job board/list files
// 🔁 Performs: Displays job summary with optional Apply button
// 🧪 Test Coverage: Manual QA pending, used across all job lists
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Lightweight render only

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
// - Section layouts (e.g., JobsHub) use <Outlet /> to render tab-aware nested views
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

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function JobCard({
  job,
  onApply,
  onClick,
  onFeedback,
  onToggleFeedback,
  showFeedback,
  feedback,
  children,
  debug = true,
}) {
  const cardRef = useRef();

  useEffect(() => {
    const cardEl = cardRef.current;
  
    if (!debug || !(cardEl instanceof Element)) return;
  
    const observer = new ResizeObserver(() => {
      const cardRect = cardEl.getBoundingClientRect();
      const parentRect = cardEl.parentElement?.getBoundingClientRect();
  
      if (parentRect) {
        const overflowsHorizontally = cardRect.width > parentRect.width;
  
        console.log('[JobCard DEBUG]', {
          jobId: job?._id,
          title: job?.title,
          cardWidth: cardRect.width,
          parentWidth: parentRect.width,
          overflowsHorizontally,
        });
  
        if (overflowsHorizontally) {
          console.warn(`[JobCard WARNING] JobCard with title "${job?.title}" exceeds its container width!`);
        }
      }
    });
  
    observer.observe(cardEl);
  
    return () => observer.disconnect();
  }, [debug, job]);
  

  return (
    <div
      ref={cardRef}
      onClick={() => onClick?.(job._id)}
      className={`
        w-full max-w-md mx-auto
        h-[320px] min-h-[320px] max-h-[320px]
        box-border border-2 ${debug ? 'border-red-500' : 'border-gray-700'}
        rounded-xl bg-[#2a3439] text-white shadow-md
        transition-all p-4 mb-6 overflow-hidden cursor-pointer flex flex-col justify-start
      `}
    >
      <h3 className="text-xl font-semibold mb-2 line-clamp-1 break-words">{job.title}</h3>

      <p className="text-sm mb-1">
        <strong>Posted by:</strong>{' '}
        {job.posterId?.username ? (
          <Link
            to={`/profile/${job.posterId._id}`}
            className="text-blue-400 hover:underline break-words line-clamp-1"
          >
            {job.posterId.username}
          </Link>
        ) : (
          <span className="italic text-gray-400">Unknown</span>
        )}
      </p>

      <p className="text-sm mb-1">
        <strong>Description:</strong>{' '}
        <span className="break-words line-clamp-2">{job.description}</span>
      </p>

      <p className="text-sm mb-1"><strong>Location:</strong> <span className="line-clamp-1 break-words">{job.location}</span></p>
      <p className="text-sm mb-1"><strong>Compensation:</strong> <span className="line-clamp-1 break-words">{job.compensation}</span></p>

      {job.requirements && (
        <p className="text-sm mb-1">
          <strong>Requirements:</strong>{' '}
          <span className="break-words line-clamp-1">{job.requirements}</span>
        </p>
      )}

      {job.category && (
        <p className="text-sm mb-1"><strong>Category:</strong> <span className="line-clamp-1 break-words">{job.category}</span></p>
      )}

      {job.expiresAt && (
        <p className="text-sm mb-1"><strong>Expires:</strong> {new Date(job.expiresAt).toLocaleDateString()}</p>
      )}

      {job.isFilled && (
        <p className="text-green-500 text-sm mt-1">
          ✅ Filled by: {job.selectedApplicant?.username || <em>Unknown</em>}
        </p>
      )}

      {children && <div className="mt-auto">{children}</div>}
    </div>
  );
}

export default JobCard;
