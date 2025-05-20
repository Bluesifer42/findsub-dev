// ====================================================================
// 📂 Full File Path & Name: /utils/devtools/purgeUsers.js
// 📌 Purpose: Purge all non-admin users and their related data from the database
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dev | Admin (enforced via route/middleware)
// 🔄 Related Backend Files: /routes/DevToolsRoutes.js, /controllers/DevToolsController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');
const SharedProfile = require('../../models/SharedProfile');
const Job = require('../../models/Job');
const Application = require('../../models/Application');
const Feedback = require('../../models/Feedback');

async function purgeUsers() {
  const usersToDelete = await User.find({ role: { $ne: 'Admin' } });

  const userIds = usersToDelete.map(user => user._id);
  const sharedProfileIds = usersToDelete.map(user => user.sharedProfileId);

  const deletedUsers = await User.deleteMany({ _id: { $in: userIds } });
  const deletedProfiles = await SharedProfile.deleteMany({ _id: { $in: sharedProfileIds } });
  const deletedJobs = await Job.deleteMany({ posterId: { $in: userIds } });
  const deletedApps = await Application.deleteMany({ applicant_id: { $in: userIds } });
  const deletedFeedback = await Feedback.deleteMany({
    $or: [
      { fromUser: { $in: userIds } },
      { toUser: { $in: userIds } }
    ]
  });

  return {
    deletedUsers: deletedUsers.deletedCount,
    deletedProfiles: deletedProfiles.deletedCount,
    deletedJobs: deletedJobs.deletedCount,
    deletedApplications: deletedApps.deletedCount,
    deletedFeedback: deletedFeedback.deletedCount
  };
}

module.exports = purgeUsers;
