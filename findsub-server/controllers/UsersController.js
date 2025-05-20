// ====================================================================
// 📂 Full File Path & Name: /controllers/UsersController.js
// 📌 Purpose: Handles all user-facing logic including updates, verification, and public profile info
// 🧩 File Type: Express Controller
// 🔐 Requires Authenticated User: true (verifyToken for private actions)
// 🔐 Role Restricted: Any (route-specific auth applied)
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /models/User.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Profile update, avatar upload, email/phone verification
// 🔁 Performs: Get/update user info, simulate verification stubs
// 🧪 Test Coverage: Postman verified; used in core profile UI
// 🌐 Environment-Specific Logic: Only stubbed email/phone verify in dev
// ⚡ Performance Notes: No performance overhead expected unless avatar storage expands

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

console.log('📦 /controllers/UsersController.js mounted');

exports.removeRole = require('../utils/users/removeRole');
exports.getUserById = require('../utils/users/getUserById');
exports.updateUser = require('../utils/users/updateUser');
exports.uploadProfilePic = require('../utils/users/uploadProfilePic');
exports.getPublicProfile = require('../utils/users/getPublicProfile');
exports.verifyEmail = require('../utils/users/verifyEmail');
exports.verifyPhone = require('../utils/users/verifyPhone');
exports.getPublicProfileByDisplayName = require('../utils/users/getPublicProfileByDisplayName');
