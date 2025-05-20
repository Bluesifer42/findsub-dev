// ====================================================================
// 📂 Full File Path & Name: /utils/subscription/handleAutoDowngrade.js
// 📌 Purpose: Downgrades a user to voyeur if subscription is inactive
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const SharedProfile = require('../../models/SharedProfile');

async function handleAutoDowngrade(user) {
  if (user.subscription?.billingStatus === 'active' || user.role === 'Voyeur') {
    return user; // no downgrade needed
  }

  const archivedRole = user.role;
  user.role = 'Voyeur';
  user.acting_as = 'Voyeur';

  if (user.sharedProfileId) {
    await SharedProfile.findByIdAndUpdate(
      user.sharedProfileId,
      {
        $pull: { roles_available: archivedRole },
        $addToSet: {
          archived_roles: {
            role: archivedRole,
            archived_at: new Date(),
            reason: 'Auto-downgrade on login due to expired subscription'
          }
        }
      }
    );
  }

  await user.save();
  return user;
}

module.exports = handleAutoDowngrade;
