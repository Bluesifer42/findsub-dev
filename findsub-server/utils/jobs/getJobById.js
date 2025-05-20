// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/getJobById.js
// 📌 Purpose: Fetch a single job by ID with populated details
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function getJobById(jobId) {
  const job = await Job.findById(jobId)
    .populate('posterId', 'username role')
    .populate('selectedApplicant', 'username role')
    .populate('requiredKinks', 'name description');
  return job;
}

module.exports = getJobById;
