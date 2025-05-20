// ====================================================================
// 📂 Full File Path & Name: /utils/admin/getFormattedAdminDirectory.js
// 📌 Purpose: Returns all admins and their linked AdminProfiles
// ====================================================================

const User = require('../../models/User');

module.exports = async function getFormattedAdminDirectory() {
  const admins = await User.find({ role: 'Admin' })
    .select('_id username email role isOwner adminProfileId')
    .populate('adminProfileId', 'name contactEmail contactPhone region notes');

  return admins.map(admin => ({
    _id: admin._id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
    isOwner: admin.isOwner,
    adminProfile: admin.adminProfileId || null,
  }));
};