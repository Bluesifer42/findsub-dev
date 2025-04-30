// ==============================================
// 📦 File: /controllers/index.js
// Purpose: Centralized import and export of all controller modules
// Standards:
// - CamelCase imports
// - Console logs on load
// ==============================================

console.log('📦 /controllers/index.js mounted');

// 🎯 Controller imports
const jobsController = require('./JobsController');
const usersController = require('./UsersController');
const feedbackController = require('./FeedbackController');
const adminController = require('./AdminController');
const devToolsController = require('./DevToolsController');
const authController = require('./AuthController');
const applicationController = require('./ApplicationController'); // ✅ NEW: Applications controller

// 📤 Export all controllers for easy centralized access
module.exports = {
  jobsController,
  usersController,
  feedbackController,
  adminController,
  devToolsController,
  authController,
  applicationController, // ✅
};
