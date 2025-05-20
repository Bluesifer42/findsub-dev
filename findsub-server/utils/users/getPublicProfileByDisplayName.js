// ====================================================================
// 📂 Full File Path & Name: /utils/users/getPublicProfileByDisplayName.js
// 📌 Purpose: Find public SharedProfile by display name (case-insensitive)
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const SharedProfile = require('../../models/SharedProfile');

async function getPublicProfileByDisplayName(displayName) {
  const profile = await SharedProfile.findOne({ display_name: displayName.toLowerCase() });
  if (!profile) throw new Error('Profile not found');
  return profile;
}

module.exports = getPublicProfileByDisplayName;
