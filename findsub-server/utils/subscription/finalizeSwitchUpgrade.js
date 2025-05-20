// ====================================================================
// 📂 Full File Path & Name: /utils/subscription/finalizeSwitchUpgrade.js
// 📌 Purpose: Finalizes the Switch upgrade by linking accounts and updating profile
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom/Sub
// 🔄 Related Backend Files: /routes/SubscriptionRoutes.js, /controllers/SubscriptionController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const SharedProfile = require('../../models/SharedProfile');

async function finalizeSwitchUpgrade(currentUser, linkedUser, oppositeRole) {
  currentUser.linkedAccountId = linkedUser._id;
  currentUser.subscription.isSwitchUnlocked = true;
  await currentUser.save();

  const shared = await SharedProfile.findById(currentUser.sharedProfileId);
  if (shared && !shared.roles_available.includes(oppositeRole.toLowerCase())) {
    shared.roles_available.push(oppositeRole.toLowerCase());
    await shared.save();
  }

  return {
    message: 'Switch upgrade successful',
    newUser: {
      _id: linkedUser._id,
      role: linkedUser.role,
      username: linkedUser.username,
    },
  };
}

module.exports = finalizeSwitchUpgrade;
