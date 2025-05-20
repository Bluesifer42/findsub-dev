// ====================================================================
// 📂 Full File Path & Name: /controllers/JobsController.js
// 📌 Purpose: Define all job-related controller logic (create, read, update, delete, manage status and selection)
// 🧩 File Type: Express Controller
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom/Sub (validated via middleware)
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /models/Job.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: API calls from frontend job board
// 🔁 Performs: Full job lifecycle control
// 🧪 Test Coverage: Manual QA during JobsHub flow
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes:
// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================
//
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
//
// 🧱 Responsive & Layout Standards:
// - All pages except auth use <LayoutWrapper> for consistent page sizing, scroll control, and sidebar injection
//
// 🧪 Testing/Debugging Aids:
// - Console logs: `[FileName DEBUG] [message]`
// - Logs API payloads/responses in development only
//
// 🔁 API Integration:
// - All calls made via centralized api.js
// - Raw data returned, transformed only in consuming component
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

console.log('📦 /controllers/JobsController.js mounted');

exports.getAllJobs = require('../utils/jobs/getAllJobs');
exports.createJob = require('../utils/jobs/createJob');
exports.getJobById = require('../utils/jobs/getJobById');
exports.editJob = require('../utils/jobs/editJob');

exports.getJobsByPoster = require('../utils/jobs/getJobsByPoster');
exports.getDomJobHistory = require('../utils/jobs/getDomJobHistory');
exports.getJobsAwaitingFeedback = require('../utils/jobs/getJobsAwaitingFeedback');
exports.getFilledJobsForUser = require('../utils/jobs/getFilledJobsForUser');

exports.updateJobStatus = require('../utils/jobs/updateJobStatus');
exports.deleteJob = require('../utils/jobs/deleteJob');
exports.selectApplicant = require('../utils/jobs/selectApplicant');

// Deprecated placeholders (now handled in ApplicationController)
exports.applyToJob = (req, res) => {
  console.warn('[JobsController] Warning: applyToJob is deprecated. Handled by ApplicationController.');
  res.status(501).json({ error: 'Use /api/applications instead' });
};

exports.retractApplication = (req, res) => {
  console.warn('[JobsController] Warning: retractApplication is deprecated. Handled by ApplicationController.');
  res.status(501).json({ error: 'Use /api/applications instead' });
};
