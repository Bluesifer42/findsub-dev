// ====================================================================
// 📂 Full File Path & Name: /utils/admin/forceVoyeurMode.js
// 📌 Purpose: Force downgrade a user to voyeur mode, reset actingAs, unlink dual accounts
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /controllers/AdminController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function forceVoyeurMode(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.role = 'Voyeur';
  user.acting_as = 'Voyeur';
  user.linkedAccountId = null;

  await user.save();

  return {
    message: 'User downgraded to voyeur successfully.',
    userId: user._id
  };
}

module.exports = forceVoyeurMode;
