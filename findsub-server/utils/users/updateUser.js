// ====================================================================
// 📂 Full File Path & Name: /utils/users/updateUser.js
// 📌 Purpose: Update a user’s record by ID and return the updated version
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function updateUser(userId, updates) {
  const updated = await User.findByIdAndUpdate(userId, updates, { new: true });
  if (!updated) throw new Error('User not found');
  return updated;
}

module.exports = updateUser;
