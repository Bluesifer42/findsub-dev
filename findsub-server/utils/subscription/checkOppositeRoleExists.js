// ====================================================================
// 📂 Full File Path & Name: /utils/subscription/checkOppositeRoleExists.js
// 📌 Purpose: Checks if opposite role already exists for shared profile
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom/Sub
// 🔄 Related Backend Files: /routes/SubscriptionRoutes.js, /controllers/SubscriptionController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const User = require('../../models/User');

async function checkOppositeRoleExists(sharedProfileId, oppositeRole) {
  const existing = await User.findOne({
    sharedProfileId,
    role: oppositeRole
  });

  return !!existing;
}

module.exports = checkOppositeRoleExists;
