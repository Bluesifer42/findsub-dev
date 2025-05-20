// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/getFilledJobsForUser.js
// 📌 Purpose: Return jobs where user is selected applicant and job is filled or completed
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Sub
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function getFilledJobsForUser(userId) {
  return await Job.find({
    selectedApplicant: userId,
    status: { $in: ['filled', 'completed'] }
  }).populate('posterId', 'username role');
}

module.exports = getFilledJobsForUser;