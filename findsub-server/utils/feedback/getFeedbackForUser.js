// ====================================================================
// 📂 Full File Path & Name: /utils/feedback/getFeedbackForUser.js
// 📌 Purpose: Fetch all feedback received by a user, optionally filtered by acting role
// 🧩 File Type: Server-side Helper Function
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub
// 🔄 Related Backend Files: /routes/FeedbackRoutes.js, /controllers/FeedbackController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Feedback = require('../../models/Feedback');

const getFeedbackForUser = async (userId, roleFilter) => {
  const query = { to_user: userId };
  if (roleFilter && ['dom', 'sub'].includes(roleFilter)) {
    query.acting_as = roleFilter;
  }

  return Feedback.find(query)
    .populate('from_user', 'username role')
    .populate('to_user', 'username role');
};

module.exports = getFeedbackForUser;
