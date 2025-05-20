// ====================================================================
// 📂 Full File Path & Name: /utils/subscription/verifyDevWalletForUpgrade.js
// 📌 Purpose: Ensures user has enough dev wallet balance for upgrade and logs transaction
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/SubscriptionRoutes.js, /controllers/SubscriptionController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Transaction = require('../../models/Transaction');

async function verifyDevWalletForUpgrade(user, upgradeCost) {
  if (!user.devWallet?.isDev) {
    return { allowed: false, status: 403, error: 'Dev upgrade requires dev wallet access' };
  }

  if (user.devWallet.balance < upgradeCost) {
    return { allowed: false, status: 402, error: 'Insufficient dev wallet balance' };
  }

  user.devWallet.balance -= upgradeCost;
  await user.save();

  await Transaction.create({
    user_id: user._id,
    type: 'upgrade',
    amount: upgradeCost,
    currency: 'GBP',
    source: 'devWallet',
    status: 'complete',
    note: 'Switch upgrade (dev simulated)',
  });

  return { allowed: true };
}

module.exports = verifyDevWalletForUpgrade;
