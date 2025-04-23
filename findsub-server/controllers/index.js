// /controllers/index.js
console.log('📦 /controllers/index.js mounted');

const jobsController = require('./jobsController');
const UsersController = require('./UsersController');
const feedbackController = require('./feedbackController');
const adminController = require('./adminController');
const devToolsController = require('./devToolsController');
const authController = require('./authController');

module.exports = {
  jobsController,
  UsersController,
  feedbackController,
  adminController,
  devToolsController,
  authController,
};
