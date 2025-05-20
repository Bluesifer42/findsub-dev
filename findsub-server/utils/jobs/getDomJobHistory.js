// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/getDomJobHistory.js
// 📌 Purpose: Retrieve completed or failed jobs posted by a specific Dom
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function getDomJobHistory(domId) {
  return await Job.find({
    posterId: domId,
    status: { $in: ['completed', 'failed'] }
  });
}

module.exports = getDomJobHistory;