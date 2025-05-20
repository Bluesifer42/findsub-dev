// ====================================================================
// 📂 Full File Path & Name: /utils/admin/deleteUserById.js
// 📌 Purpose: Permanently delete a user account by their Mongo _id
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /controllers/AdminController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function deleteUserById(userId) {
  return await User.findByIdAndDelete(userId);
}

module.exports = deleteUserById;
