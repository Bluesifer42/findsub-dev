// ====================================================================
// 📂 Full File Path & Name: /utils/users/uploadProfilePic.js
// 📌 Purpose: Replace or upload a user’s profile picture by ID
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function uploadProfilePic(userId, newPicUrl) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  user.profilePic = newPicUrl;
  await user.save();
  return user;
}

module.exports = uploadProfilePic;
