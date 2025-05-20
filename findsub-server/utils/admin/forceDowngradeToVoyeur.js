// ====================================================================
// 📂 Full File Path & Name: /utils/admin/forceDowngradeToVoyeur.js
// 📌 Purpose: Forcefully downgrades user to voyeur and resets role/links
// ====================================================================

const User = require('../../models/User');

module.exports = async function forceDowngradeToVoyeur(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.role = 'Voyeur';
  user.acting_as = 'Voyeur';
  user.linkedAccountId = null;
  await user.save();

  return user;
};