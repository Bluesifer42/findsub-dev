// ====================================================================
// 📂 Full File Path & Name: /routes/index.js
// 📌 Purpose: Centralized import and export of all Express API route modules
// 🧩 File Type: Express Route Aggregator
// 🔐 Requires Authenticated User: false (each route enforces its own access)
// 🔐 Role Restricted: false (handled per route with middleware)
// 🔄 Related Backend Files: /server.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: App boot
// 🧪 Test Coverage: All routes are smoke-tested via Postman and Admin DevTools
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Only executed once during server boot

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================

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

console.log('📦 /routes/index.js mounted');

// ✅ Route Module Imports
const JobsRoutes = require('./JobsRoutes');               // /api/jobs
const UsersRoutes = require('./UsersRoutes');             // /api/users
const FeedbackRoutes = require('./FeedbackRoutes');       // /api/feedback
const AdminRoutes = require('./AdminRoutes');             // /api/admin
const DevToolsRoutes = require('./DevToolsRoutes');       // /api/devtools
const AuthRoutes = require('./AuthRoutes');               // /api/auth
const ApplicationRoutes = require('./ApplicationRoutes'); // /api/applications
const KinkRoutes = require('./KinkRoutes');               // /api/kinks

// ✅ Central Route Export for server.js
module.exports = {
  JobsRoutes,
  UsersRoutes,
  FeedbackRoutes,
  AdminRoutes,
  DevToolsRoutes,
  AuthRoutes,
  ApplicationRoutes,
  KinkRoutes,
};
