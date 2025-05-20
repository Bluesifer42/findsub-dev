// ====================================================================
// 📂 Full File Path & Name: /utils/users/getPublicProfile.js
// 📌 Purpose: Fetch public-facing identity info for a user by ID
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function getPublicProfile(userId) {
  const user = await User.findById(userId).select('username role reputation badges');
  if (!user) throw new Error('User not found');
  return user;
}

module.exports = getPublicProfile;
