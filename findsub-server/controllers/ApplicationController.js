// ====================================================================
// 📂 Full File Path & Name: /controllers/ApplicationController.js
// 📌 Purpose: Handle all job application logic (fetching, applying, retracting)
// 🧩 File Type: Express Controller
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom/Sub (validated via middleware)
// 🔄 Related Backend Files: /routes/ApplicationRoutes.js, /models/Application.js, /models/Job.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: POST /api/applications, DELETE /api/apply/:jobId/:userId
// 🧪 Test Coverage: Manual testing required
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
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

console.log('📦 /controllers/ApplicationController.js mounted');

const getApplicationsForJob = require('../utils/applications/getApplicationsForJob');
const applyToJob = require('../utils/applications/applyToJob');
const retractApplication = require('../utils/applications/retractApplication');
const getApplicationsByUser = require('../utils/applications/getApplicationsByUser');

exports.getApplicationsForJob = getApplicationsForJob;
exports.applyToJob = applyToJob;
exports.retractApplication = retractApplication;
exports.getApplicationsByUser = getApplicationsByUser;
