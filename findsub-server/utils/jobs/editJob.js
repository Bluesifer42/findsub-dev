// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/editJob.js
// 📌 Purpose: Update job fields with new data
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function editJob(jobId, updatePayload) {
  const updated = await Job.findByIdAndUpdate(jobId, updatePayload, { new: true });
  return updated;
}

module.exports = editJob;
