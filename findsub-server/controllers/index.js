// ====================================================================
// 📂 Full File Path & Name: /controllers/index.js
// 📌 Purpose: Central export hub for all Express controllers
// 🧩 File Type: Backend Index Module
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Varies per controller/middleware
// 🔄 Related Backend Files: All /routes/*.js
// 👩‍👦 Is a child component : false
// ====================================================================

module.exports = {
  AdminController: require('./AdminController'),
  ApplicationController: require('./ApplicationController'),
  AuthController: require('./AuthController'),
  DevToolsController: require('./DevToolsController'),
  FeedbackController: require('./FeedbackController'),
  JobsController: require('./JobsController'),
  KinkController: require('./KinkController'),
  SubscriptionController: require('./SubscriptionController'),
  TransactionController: require('./TransactionController'),
  UsersController: require('./UsersController'),
};
