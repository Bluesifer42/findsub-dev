// ====================================================================
// 📂 Full File Path & Name: /routes/AuthRoutes.js
// 📌 Purpose: Defines authentication and registration routes for login, role-specific signup, and current user fetching
// 🧩 File Type: Express Route Module
// 🔐 Requires Authenticated User: false (register/login public, /me protected)
// 🔐 Role Restricted: Any (roles assigned post-registration)
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Signup form, login form, token validation
// 🔁 Performs: Routes incoming auth requests to corresponding controller logic
// 🧪 Test Coverage: Covered in auth smoke tests and postman collections
// 🌐 Environment-Specific Logic: None in this route file
// ⚡ Performance Notes: Stateless — all auth logic handled via controller + JWT

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
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

console.log('📦 /routes/AuthRoutes.js mounted');

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken');

// ===============================
// 🔐 Auth Routes (Prefix: /api/auth)
// ===============================

/**
 * Register a new user with Dom role (forced).
 * POST /api/auth/register/dom
 */
router.post('/register/dom', (req, res) => {
  req.body.role = 'Dom';
  AuthController.registerUser(req, res);
});

/**
 * Register a new user with Sub role (forced).
 * POST /api/auth/register/sub
 */
router.post('/register/sub', (req, res) => {
  req.body.role = 'Sub';
  AuthController.registerUser(req, res);
});

/**
 * Register a new Voyeur (onboarding only)
 * POST /api/auth/register/voyeur
 */
router.post('/register/voyeur', (req, res) => {
  req.body.role = 'Voyeur';
  AuthController.registerUser(req, res);
});

/**
 * Default registration route (fallback or internal use).
 * POST /api/auth/register
 */
router.post('/register', AuthController.registerUser);

/**
 * Authenticate user and return JWT token.
 * POST /api/auth/login
 */
router.post('/login', AuthController.loginUser);

/**
 * Get authenticated user's info (requires token).
 * GET /api/auth/me
 */
router.get('/me', verifyToken, AuthController.getCurrentUser);

module.exports = router;
