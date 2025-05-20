// ====================================================================
// 📂 Full File Path & Name: /routes/DevToolsRoutes.js
// 📌 Purpose: Routes for internal dev tools — account creation, test data, and mock payment logic
// 🧩 File Type: Express Route Module
// 🔐 Requires Authenticated User: Some routes (via verifyToken)
// 🔐 Role Restricted: Any (dev-only logic)
// 🔄 Related Backend Files: /controllers/DevToolsController.js, /middlewares/chargeDevWallet.js
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Manual dev-only API calls
// 🔁 Performs: Creates test users/jobs, simulates dev charges
// 🧪 Test Coverage: Manual testing via Postman or dev client only
// 🌐 Environment-Specific Logic: All routes auto-disabled in production
// ⚡ Performance Notes: Lightweight; only runs in non-production environments

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

console.log('📦 /routes/DevToolsRoutes.js mounted');

const express = require('express');
const router = express.Router();
const DevToolsController = require('../controllers/DevToolsController');
const verifyToken = require('../middlewares/verifyToken');
const chargeDevWallet = require('../middlewares/chargeDevWallet');

/**
 * Create a new test user
 * POST /api/devtools/create-user
 */
router.post('/create-user', DevToolsController.createTestUser);

/**
 * Create a new test job
 * POST /api/devtools/create-job
 */
router.post('/create-job', DevToolsController.createTestJob);

/**
 * Simulate a wallet charge (authenticated via JWT token)
 * POST /api/devtools/dev-charge
 * Header: Authorization: Bearer <JWT>
 */
router.post(
  '/dev-charge',
  verifyToken,
  chargeDevWallet(1.50, 'Dev Token Test Charge'),
  (req, res) => {
    res.json({
      message: 'Charge successful (via token)',
      paymentStatus: req.paymentStatus
    });
  }
);

/**
 * Purge all non-admin users and related data
 * DELETE /api/devtools/purge/users
 */
router.delete('/purge/users', DevToolsController.purgeUsers);



module.exports = router;

