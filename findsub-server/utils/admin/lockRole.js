// ====================================================================
// 📂 Full File Path & Name: /utils/admin/lockRole.js
// 📌 Purpose: Lock or unlock a Dom/Sub role on a shared profile for moderation control
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /controllers/AdminController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const SharedProfile = require('../../models/SharedProfile');

async function lockRole({ sharedProfileId, role, locked }) {
  if (!['dom', 'sub'].includes(role)) {
    throw new Error('Invalid role provided');
  }

  const profile = await SharedProfile.findById(sharedProfileId);
  if (!profile) {
    throw new Error('Shared profile not found');
  }

  if (!profile.role_locks) profile.role_locks = {};
  profile.role_locks[role] = locked;

  await profile.save();
  return `Role '${role}' has been ${locked ? 'locked' : 'unlocked'}.`;
}

module.exports = lockRole;
