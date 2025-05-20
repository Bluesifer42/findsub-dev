// ====================================================================
// 📂 Full File Path & Name: /routes/UsersRoutes.js
// 📌 Purpose: Defines user management and profile access routes including updates, verification, and public view
// 🧩 File Type: Express Route Module
// 🔐 Requires Authenticated User: true for private routes
// 🔐 Role Restricted: Any (guarded per route via verifyToken)
// 🔄 Related Backend Files: /controllers/UsersController.js
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Profile edits, account access, or public profile views
// 🔁 Performs: Get/update user, upload avatar, verify contact info
// 🧪 Test Coverage: Smoke tested via Postman, UI triggers via /profile
// 🌐 Environment-Specific Logic: N/A
// ⚡ Performance Notes: Lightweight unless large gallery uploads added later

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

console.log('📦 /routes/UsersRoutes.js mounted');

const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const verifyToken = require('../middlewares/verifyToken');

/**
 * Stub — Marks user's email as verified
 * POST /api/users/verify/email
 */
router.post('/verify/email', verifyToken, UsersController.verifyEmail);

/**
 * Stub — Marks user's phone as verified
 * POST /api/users/verify/phone
 */
router.post('/verify/phone', verifyToken, UsersController.verifyPhone);

// GET /api/users/public-profile/:displayName
router.get('/public-profile/:displayName', UsersController.getPublicProfileByDisplayName);

// 🧠 View user by ID
router.get('/:id', UsersController.getUserById);

// ✏️ Update user info
router.post('/update/:id', UsersController.updateUser);

// 🖼 Upload profile picture
router.post('/profile-pic/:id', UsersController.uploadProfilePic);

// 🌐 Public-facing profile (limited info)
router.get('/public/:id', UsersController.getPublicProfile);

// 🗑️ Remove role from user account
router.post('/remove-role', verifyToken, UsersController.removeRole);

module.exports = router;
