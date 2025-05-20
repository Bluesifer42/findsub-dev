// ====================================================================
// 📂 Full File Path & Name: /server.js
// 📌 Purpose: App entry point — configures database, Express app, middleware, and mounts all API routes
// 🧩 File Type: Express App Bootstrapper
// 🔐 Requires Authenticated User: false (handled inside routes)
// 🔐 Role Restricted: false (handled per route with middleware)
// 🔄 Related Backend Files: /routes/index.js, /middlewares/logger.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: App start (node server.js)
// 🧪 Test Coverage: Run-time tested via Postman and full-stack integration
// 🌐 Environment-Specific Logic: Uses process.env.NODE_ENV for Mongo URI selection
// ⚡ Performance Notes: CORS + JSON middleware applied globally

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

console.log('📦 Server.js mounted');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./middlewares/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Global Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// ✅ Route Imports
const {
  JobsRoutes,
  UsersRoutes,
  FeedbackRoutes,
  AdminRoutes,
  DevToolsRoutes,
  AuthRoutes,
  ApplicationRoutes,
  KinkRoutes
} = require('./routes');

// ✅ Mount API Routes
app.use('/api/jobs', JobsRoutes);
app.use('/api/users', UsersRoutes);
app.use('/api/feedback', FeedbackRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/devtools', DevToolsRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/applications', ApplicationRoutes);
app.use('/api/kinks', KinkRoutes);
app.use('/api/feedback', FeedbackRoutes);

// ✅ 404 Catch-all
app.use((req, res) => {
  console.warn('⚠️ 404 Not Found:', req.originalUrl);
  res.status(404).json({ error: 'Route not found' });
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

