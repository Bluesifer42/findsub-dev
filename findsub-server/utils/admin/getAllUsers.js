// ====================================================================
// 📂 Full File Path & Name: /utils/admin/getAllUsers.js
// 📌 Purpose: Fetch all users and populate shared profile display_name
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /controllers/AdminController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function getAllUsers() {
  const users = await User.find({})
    .select('_id username email role emailVerified phoneVerified trustScore reputationScore sharedProfileId')
    .populate('sharedProfileId', 'display_name');

  return users.map(user => ({
    ...user.toObject(),
    sharedProfile: user.sharedProfileId ? {
      display_name: user.sharedProfileId.display_name
    } : null
  }));
}

module.exports = getAllUsers;
