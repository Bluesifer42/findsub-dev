// ====================================================================
// 📂 Full File Path & Name: /utils/subscription/upgradeVoyeurToRole.js
// 📌 Purpose: Upgrades a Voyeur to Dom, Sub, or Switch and updates shared profile
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Voyeur
// 🔄 Related Backend Files: /routes/SubscriptionRoutes.js, /controllers/SubscriptionController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const SharedProfile = require('../../models/SharedProfile');

async function upgradeVoyeurToRole(user, targetRole) {
  user.role = targetRole;
  user.subscription = {
    basePlan: targetRole.toLowerCase(),
    isSwitchUnlocked: targetRole === 'Switch',
    billingStatus: 'active',
    renewalDate: new Date(Date.now() + 30 * 86400000),
  };

  const shared = await SharedProfile.findById(user.sharedProfileId);
  if (shared && !shared.roles_available.includes(targetRole.toLowerCase())) {
    shared.roles_available.push(targetRole.toLowerCase());
    await shared.save();
  }

  await user.save();

  return {
    message: `Voyeur upgraded to ${targetRole}`,
    user: {
      _id: user._id,
      username: user.username,
      role: user.role,
    },
  };
}

module.exports = upgradeVoyeurToRole;
