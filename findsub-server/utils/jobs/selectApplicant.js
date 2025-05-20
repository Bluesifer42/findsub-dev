// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/selectApplicant.js
// 📌 Purpose: Assign selected applicant and mark job as filled
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function selectApplicant(jobId, applicantId) {
  const job = await Job.findById(jobId);
  if (!job) return null;
  job.selectedApplicant = applicantId;
  job.status = 'filled';
  await job.save();
  return job;
}

module.exports = selectApplicant;