// ==============================================
// 📦 File: /routes/index.js
// Purpose: Centralized import and export of all API route modules
// Standards:
// - CamelCase imports
// - Console logs on load
// ==============================================

console.log('📦 /routes/index.js mounted');

// 🎯 Route module imports
const JobsRoutes = require('./JobsRoutes');
const UsersRoutes = require('./UsersRoutes');
const FeedbackRoutes = require('./FeedbackRoutes');
const AdminRoutes = require('./AdminRoutes');
const DevToolsRoutes = require('./DevToolsRoutes');
const AuthRoutes = require('./AuthRoutes');
const ApplicationRoutes = require('./ApplicationRoutes'); // ✅ NEW: Applications route module

// 📤 Export all route modules for centralized mounting in server.js
module.exports = {
  JobsRoutes,         // => /api/jobs
  UsersRoutes,        // => /api/users
  FeedbackRoutes,     // => /api/feedback
  AdminRoutes,        // => /api/kinks (kinks live under admin routes for now)
  DevToolsRoutes,     // => /api/devtools
  AuthRoutes,         // => /api/auth
  ApplicationRoutes,  // => /api/applications ✅
};
