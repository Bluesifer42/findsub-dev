// ====================================================================
// 📂 Full File Path & Name: /routes/AdminRoutes.js
// 📌 Purpose: Admin-only tools for managing users, kinks, signup logs, and internal admin directory
// 🧩 File Type: Express Route Module
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin only (guarded via verifyToken and controller logic)
// 🔄 Related Backend Files: /controllers/AdminController.js, /middlewares/checkPermission.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Admin dashboard actions and tool page loads
// 🔁 Performs: CRUD operations for users/kinks, logs, and internal admin queries
// 🧪 Test Coverage: Manual tool testing via AdminDevTools and AdminDashboard
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Admin directory endpoint paginates at controller level

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
// - Admin access controlled by JWT role and permission logic,
//
// 🔁 API Integration:
// - All calls made via centralized api.js
// - Raw data returned, transformed only in consuming component
// - Admin actions validated inside controllers
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

console.log('📦 /routes/AdminRoutes.js mounted');

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const verifyToken = require('../middlewares/verifyToken');
const checkPermission = require('../middlewares/checkPermission');

// 🔐 Admin Tools (token + role check enforced)
router.get('/signup-attempts', verifyToken, AdminController.getSignupAttempts);
router.get('/users', verifyToken, AdminController.getAllUsers);
router.delete('/users/:userId', verifyToken, AdminController.deleteUserById);
router.post('/lock-role', verifyToken, AdminController.lockRole);
router.post('/force-voyeur', verifyToken, AdminController.forceVoyeurMode);

// 📇 Admin Directory — requires permission
router.get('/admin-directory', verifyToken, checkPermission('canViewAdminDirectory'), AdminController.getAdminDirectory);

module.exports = router;
