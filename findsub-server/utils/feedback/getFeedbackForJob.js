// ====================================================================
// 📂 Full File Path & Name: /utils/feedback/getFeedbackForJob.js
// 📌 Purpose: Fetch all feedback entries for a specific job
// 🧩 File Type: Server-side Helper Function
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub
// 🔄 Related Backend Files: /routes/FeedbackRoutes.js, /controllers/FeedbackController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Feedback = require('../../models/Feedback');

const getFeedbackForJob = async (jobId) => {
  return Feedback.find({ job_id: jobId })
    .populate('from_user', 'username role')
    .populate('to_user', 'username role');
};

module.exports = getFeedbackForJob;
