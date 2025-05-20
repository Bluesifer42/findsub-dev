// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/updateJobStatus.js
// 📌 Purpose: Update the status of a specific job by ID
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function updateJobStatus(jobId, newStatus) {
  const job = await Job.findById(jobId);
  if (!job) return null;
  job.status = newStatus;
  await job.save();
  return job;
}

module.exports = updateJobStatus;