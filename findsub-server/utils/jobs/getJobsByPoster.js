// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/getJobsByPoster.js
// 📌 Purpose: Fetch all jobs created by a specific poster
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function getJobsByPoster(posterId) {
  const jobs = await Job.find({ posterId });
  return jobs;
}

module.exports = getJobsByPoster;
