// ====================================================================
// 📂 Full File Path & Name: /utils/users/removeRole.js
// 📌 Purpose: Remove and archive a role from a user's shared profile
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');
const SharedProfile = require('../../models/SharedProfile');

async function removeRole(userId, role) {
  const user = await User.findById(userId);
  if (!user || !user.sharedProfileId) throw new Error('User or shared profile not found');

  const sharedProfile = await SharedProfile.findById(user.sharedProfileId);
  if (!sharedProfile.roles_available.includes(role)) {
    throw new Error(`Role ${role} not active`);
  }

  sharedProfile.roles_available = sharedProfile.roles_available.filter(r => r !== role);
  if (!sharedProfile.archived_roles) sharedProfile.archived_roles = [];

  sharedProfile.archived_roles.push({
    role,
    archived_at: new Date(),
    reason: 'User initiated role removal'
  });

  await sharedProfile.save();
  return { message: `${role} role successfully removed` };
}

module.exports = removeRole;
