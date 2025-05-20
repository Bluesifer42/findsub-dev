// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/getJobsAwaitingFeedback.js
// 📌 Purpose: Return jobs with status 'completed' where user was poster or applicant
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function getJobsAwaitingFeedback(userId) {
  return await Job.find({
    $or: [{ posterId: userId }, { selectedApplicant: userId }],
    status: 'completed'
  });
}

module.exports = getJobsAwaitingFeedback;