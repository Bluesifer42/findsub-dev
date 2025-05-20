// ====================================================================
// 📂 Full File Path & Name: /routes/FeedbackRoutes.js
// 📌 Purpose: Defines feedback-related routes (submit, fetch by job/user)
// 🧩 File Type: Express Route Module
// 🔐 Requires Authenticated User: true for POST /new
// 🔐 Role Restricted: Dom/Sub (middleware validated)
// 🔄 Related Backend Files: /controllers/FeedbackController.js, /middlewares/useActingAs.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Job completion, feedback pages
// 🧪 Test Coverage: FeedbackForm, FeedbackTabs, manual tests via Postman
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Feedback queries use `.populate` for efficient relation resolution

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

console.log('📦 /routes/FeedbackRoutes.js mounted');

const express = require('express');
const router = express.Router();

const FeedbackController = require('../controllers/FeedbackController');
const verifyToken = require('../middlewares/verifyToken');
const useActingAs = require('../middlewares/useActingAs');

// 📝 Submit feedback (requires auth + actingAs)
router.post('/new', verifyToken, useActingAs, FeedbackController.submitFeedback);

// 📄 View feedback for a specific job
router.get('/job/:jobId', FeedbackController.getFeedbackForJob);

// 📂 View all feedback received by a user (optionally filtered by role)
router.get('/user/:userId', FeedbackController.getFeedbackForUser);

module.exports = router;
