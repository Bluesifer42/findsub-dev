// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/getAllJobs.js
// 📌 Purpose: Retrieve all job records from the database
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (filtered by context)
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function getAllJobs() {
  const jobs = await Job.find({});
  return jobs;
}

module.exports = getAllJobs;
