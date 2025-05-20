// ====================================================================
// 📂 Full File Path & Name: /utils/devtools/createTestJob.js
// 📌 Purpose: Create a test job listing for a Dom test account
// 🧩 File Type: Express Helper Function
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Dev/Admin
// 🔄 Related Backend Files: /routes/DevToolsRoutes.js, /controllers/DevToolsController.js
// 👩‍👦  Is a child component : false
// ====================================================================

const Job = require('../../models/Job');
const User = require('../../models/User');

module.exports = async function createTestJob() {
  const domUser = await User.findOne({ role: 'Dom', testAccount: true }).sort({ createdAt: -1 });
  if (!domUser) {
    throw new Error('No Dom test users found');
  }

  const job = new Job({
    title: 'Polish Boots (Test)',
    description: 'Test listing: polish boots and deliver photo proof.',
    location: 'Remote',
    compensation: '£5',
    requirements: ['Soft cloth', 'Shoe polish'],
    preferred_skills: ['Attention to detail'],
    category: 'Domestic',
    listed_by: domUser._id,
    shared_profile_id: domUser.sharedProfileId,
    acting_as: 'dom'
  });

  await job.save();
  return job;
};
