// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/deleteJob.js
// 📌 Purpose: Delete a job record by ID
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function deleteJob(jobId) {
  const deleted = await Job.findByIdAndDelete(jobId);
  return deleted;
}

module.exports = deleteJob;