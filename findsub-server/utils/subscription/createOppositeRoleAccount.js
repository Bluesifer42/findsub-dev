// ====================================================================
// 📂 Full File Path & Name: /utils/subscription/createOppositeRoleAccount.js
// 📌 Purpose: Clones user with opposite role to unlock switch functionality
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom/Sub
// 🔄 Related Backend Files: /routes/SubscriptionRoutes.js, /controllers/SubscriptionController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function createOppositeRoleAccount(currentUser, oppositeRole) {
  const suffix = Math.floor(Math.random() * 100000);
  const newUsername = `${currentUser.username}_${oppositeRole.toLowerCase()}${suffix}`;
  const newEmail = `${newUsername}@findsub.com`;

  const linkedUser = new User({
    username: newUsername,
    email: newEmail,
    password: currentUser.password,
    role: oppositeRole,
    gender: currentUser.gender,
    dateOfBirth: currentUser.dateOfBirth,
    experienceLevel: currentUser.experienceLevel,
    phoneNumber: currentUser.phoneNumber,
    sharedProfileId: currentUser.sharedProfileId,
    linkedAccountId: currentUser._id,
    devWallet: currentUser.devWallet,
    subscription: {
      basePlan: oppositeRole.toLowerCase(),
      isSwitchUnlocked: true,
      billingStatus: 'active',
      renewalDate: new Date(Date.now() + 30 * 86400000),
    },
  });

  await linkedUser.save();
  return linkedUser;
}

module.exports = createOppositeRoleAccount;
