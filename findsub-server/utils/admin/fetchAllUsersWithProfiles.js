// ====================================================================
// 📂 Full File Path & Name: /utils/admin/fetchAllUsersWithProfiles.js
// 📌 Purpose: Fetches all users with their sharedProfile.display_name
// ====================================================================

const User = require('../../models/User');

module.exports = async function fetchAllUsersWithProfiles() {
  const users = await User.find({})
    .select('_id username email role emailVerified phoneVerified trustScore reputationScore sharedProfileId')
    .populate('sharedProfileId', 'display_name');

  return users.map(user => ({
    ...user.toObject(),
    sharedProfile: user.sharedProfileId
      ? { display_name: user.sharedProfileId.display_name }
      : null,
  }));
};