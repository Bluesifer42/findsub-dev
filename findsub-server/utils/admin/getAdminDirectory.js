// ====================================================================
// 📂 Full File Path & Name: /utils/admin/getAdminDirectory.js
// 📌 Purpose: Retrieve all admin accounts with their associated AdminProfile data
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Admin
// 🔄 Related Backend Files: /routes/AdminRoutes.js, /controllers/AdminController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function getAdminDirectory() {
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
}

module.exports = getAdminDirectory;
