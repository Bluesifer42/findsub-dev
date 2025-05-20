// ====================================================================
// 📂 Full File Path & Name: /utils/feedback/submitFeedback.js
// 📌 Purpose: Handles validation and saving of feedback entries
// 🧩 File Type: Server-side Helper Function
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub
// 🔄 Related Backend Files: /routes/FeedbackRoutes.js, /controllers/FeedbackController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Feedback = require('../../models/Feedback');
const Job = require('../../models/Job');

const submitFeedback = async ({ jobId, fromUserId, toUserId, content, rating, actingAs }) => {
  if (toUserId === fromUserId) {
    throw new Error('Cannot submit feedback to yourself');
  }

  const jobExists = await Job.findById(jobId);
  if (!jobExists) {
    throw new Error('Associated job not found');
  }

  const feedback = new Feedback({
    job_id: jobId,
    from_user: fromUserId,
    to_user: toUserId,
    content,
    rating,
    acting_as: actingAs,
  });

  await feedback.save();
  return feedback;
};

module.exports = submitFeedback;
