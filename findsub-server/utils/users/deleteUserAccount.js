// ====================================================================
// 📂 Full File Path & Name: /utils/user/deleteUserAccount.js
// 📌 Purpose: Permanently deletes a user account by ID
// ====================================================================

const User = require('../../models/User');

module.exports = async function deleteUserAccount(userId) {
  return await User.findByIdAndDelete(userId);
};