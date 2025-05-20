// ====================================================================
// 📂 Full File Path & Name: /controllers/AuthController.js
// 📌 Purpose: Handles registration, login, onboarding fees, shared profile creation, and logs all signup attempts
// 🧩 File Type: Express Controller
// 🔐 Requires Authenticated User: false (login/register are public)
// 🔐 Role Restricted: Any (enforced per route or sharedProfile rules)
// 🔄 Related Backend Files: /routes/AuthRoutes.js, /models/User.js, /models/SharedProfile.js, /models/SignupAttempt.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Login, register form submissions
// 🔁 Performs: Auth, profile linkage, dev fee charge, signup logging
// 🧪 Test Coverage: Manual test cycle + Postman coverage
// 🌐 Environment-Specific Logic: Onboarding fee mocked in dev only
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
// - Admin accounts must be created internally and are not exposed via register
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
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

console.log('📦 /controllers/AuthController.js mounted');

const loginUser = require('../utils/auth/loginUser');
const registerUser = require('../utils/auth/registerUser');
const getCurrentUser = require('../utils/auth/getCurrentUser');

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.getCurrentUser = getCurrentUser;
