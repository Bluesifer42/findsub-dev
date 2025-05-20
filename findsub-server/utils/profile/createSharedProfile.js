// ====================================================================
// 📂 Full File Path & Name: /utils/profile/createSharedProfile.js
// 📌 Purpose: Builds a shared profile for new Dom/Sub/Voyeur users
// 🧩 File Type: Backend Utility Function
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦  Is a child component : false
// ====================================================================

const SharedProfile = require('../../models/SharedProfile');

const createSharedProfile = async (username, role) => {
  const profile = new SharedProfile({
    display_name: username,
    avatar_url: '',
    bio: '',
    roles_available: role === 'Voyeur' ? [] : [role.toLowerCase()],
    reputation: { dom: 0, sub: 0 }
  });

  await profile.save();
  return profile;
};

module.exports = createSharedProfile;
