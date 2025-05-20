// File: /routes/JobsRoutes.js
// ====================================================================
// 📂 Full File Path & Name: [replace with actual path]
// 📌 Purpose: [Short sentence explaining the file's intent or feature context]
// 🧩 File Type: React Page | Express Controller | Shared Component | Mongoose Model | Utility | Hook
// 🔐 Requires Authenticated User: true/false
// 🔐 Role Restricted: Dom | Sub | Switch | Any (enforced via `restrictToRole` middleware)
// 🔄 Related Backend Files: /routes/[RouteFile].js, /controllers/[ControllerFile].js
// 🔁 useEffect Hooks Used: true/false
// 🔁 Triggers: [e.g., selectedJobId change, form submission]
// 🔁 Performs: [e.g., fetch jobs, submit form, apply logic]
// 🧪 Test Coverage: [e.g., Unit tests in __tests__/FileName.test.js, Integration tests pending]
// 🌐 Environment-Specific Logic: Uses `process.env.NODE_ENV` to differentiate dev/prod behavior (e.g., logging, mocks, API endpoints)
// ⚡ Performance Notes: [e.g., Memoized with React.memo, Avoids heavy renders]

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


console.log('📦 /routes/JobsRoutes.js mounted');

const express = require('express');
const router = express.Router();
const JobsController = require('../controllers/JobsController');

// ✅ Public Jobs
router.get('/', JobsController.getAllJobs);
router.post('/', JobsController.createJob);

// ✅ Poster job list view (for manage listings)
router.get('/poster', JobsController.getJobsByPoster);

// ✅ Dom / Poster job history
router.get('/history/:domId', JobsController.getDomJobHistory);

// ✅ Jobs awaiting feedback
router.get('/awaiting-feedback/:userId', JobsController.getJobsAwaitingFeedback);

// ✅ Sub accepted jobs (filled and completed)
router.get('/filled/:userId', JobsController.getFilledJobsForUser);

// ✅ Actions
router.post('/status/:id', JobsController.updateJobStatus);
router.delete('/delete/:jobId', JobsController.deleteJob);
router.post('/select', JobsController.selectApplicant);
router.post('/apply', JobsController.applyToJob);
router.delete('/apply/:jobId/:userId', JobsController.retractApplication);

// ✅ Single Job
router.get('/:id', JobsController.getJobById);
router.put('/:id', JobsController.editJob);

module.exports = router;
