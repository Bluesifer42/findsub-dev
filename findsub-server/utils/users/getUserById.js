// ====================================================================
// 📂 Full File Path & Name: /utils/users/getUserById.js
// 📌 Purpose: Fetch a user document by their MongoDB _id
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function getUserById(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return user;
}

module.exports = getUserById;
