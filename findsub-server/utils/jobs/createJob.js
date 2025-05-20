// ====================================================================
// 📂 Full File Path & Name: /utils/jobs/createJob.js
// 📌 Purpose: Create a new job post with user input
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Job = require('../../models/Job');

async function createJob({ title, description, requirements, location, reward, userId, actingAs }) {
  const newJob = new Job({
    title,
    description,
    requirements,
    location,
    reward,
    posted_by: userId,
    acting_as: actingAs,
  });
  await newJob.save();
  return newJob;
}

module.exports = createJob;
