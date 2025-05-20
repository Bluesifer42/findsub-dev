// ====================================================================
// 📂 Full File Path & Name: /utils/sharedProfiles/lockRoleInSharedProfile.js
// 📌 Purpose: Locks or unlocks a Dom/Sub role on a SharedProfile
// ====================================================================

const SharedProfile = require('../../models/SharedProfile');

module.exports = async function lockRoleInSharedProfile(sharedProfileId, role, locked) {
  if (!['dom', 'sub'].includes(role)) throw new Error('Invalid role');

  const profile = await SharedProfile.findById(sharedProfileId);
  if (!profile) throw new Error('Shared profile not found');

  if (!profile.role_locks) profile.role_locks = {};
  profile.role_locks[role] = locked;
  await profile.save();

  return profile;
};