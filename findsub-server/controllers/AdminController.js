// ====================================================================
// 📂 Full File Path & Name: /controllers/AdminController.js
// 📌 Purpose: Provides admin-only CRUD actions for kinks and user role enforcement, and logs signup attempts
// 🧩 File Type: Express Controller
// 🔐 Requires Authenticated User: true (admin only)
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /models/Kink.js, /models/SignupAttempt.js, /models/User.js, /models/SharedProfile.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Admin dashboard actions
// 🔁 Performs: CRUD for kink/category data, role lock/demotion, signup attempt logging
// 🧪 Test Coverage: Manual QA via admin dev tools, Phase 10
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes:
// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================
//
// 📦 Data Shape:
// - Incoming API payloads: camelCase
// - MongoDB schema fields: snake_case
// - Internal React state/props/vars: camelCase
// - Kink references: ObjectId for DB queries; { _id, name, description } for UI display
// - Admins use `adminProfileId` (ref: AdminProfile)
// - Admins may include `permissions: [String]`, `isOwner: Boolean`, `isProtected: Boolean`
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
// 🚨 ESLint / Prettier:
// - Adheres to airbnb style, indentation: 2 spaces (no tabs)
// - Exceptions: `// eslint-disable-line [rule] - [reason]`
//
// 🔒 Security Notes:
// - Sanitizes user input via sanitize-html (frontend) and express-validator (backend)
// - Prevents XSS via Helmet middleware
// - Admin-only access enforced via middleware (role === 'Admin')
// - Admin account deletions restricted via `isOwner` and/or `isProtected` flags
//
// 🔁 API Integration:
// - All calls made via centralized api.js
// - Raw data returned, transformed only in consuming component
// - Admin actions must verify `role === 'Admin'` and proper `permissions[]`
//
// 🧰 Behavior Notes:
// - Flexible opt-in props (e.g., noPadding, fullWidth). Defaults enforce consistent layout unless explicitly overridden.
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
// - Admin dashboards, tables, and forms must meet same accessibility standards
//
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
// - Admin checks (e.g. isSuperAdmin, hasPermission) live in /utils/adminCheck.js
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

console.log('📦 /controllers/AdminController.js mounted');

const getSignupAttempts = require('../utils/admin/getSignupAttempts');
const lockRole = require('../utils/admin/lockRole');
const getAllUsers = require('../utils/admin/getAllUsers');
const deleteUserById = require('../utils/admin/deleteUserById');
const forceVoyeurMode = require('../utils/admin/forceVoyeurMode');
const getAdminDirectory = require('../utils/admin/getAdminDirectory');

// AdminController Function Exports
exports.getSignupAttempts = getSignupAttempts;
exports.lockRole = lockRole;
exports.getAllUsers = getAllUsers;
exports.deleteUserById = deleteUserById;
exports.forceVoyeurMode = forceVoyeurMode;
exports.getAdminDirectory = getAdminDirectory;
