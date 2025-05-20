// ====================================================================
// 📂 Full File Path & Name: /utils/transactions/topUpDevWallet.js
// 📌 Purpose: Add dev funds to user wallet and log the transaction
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dev-only (user.devWallet.isDev === true)
// 🔄 Related Backend Files: /routes/TransactionRoutes.js, /controllers/TransactionController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

async function topUpDevWallet(userId, amount) {
  if (typeof amount !== 'number' || amount <= 0) {
    return { status: 400, error: 'Invalid amount' };
  }

  const user = await User.findById(userId);
  if (!user || !user.devWallet?.isDev) {
    return { status: 403, error: 'Dev wallet access denied' };
  }

  user.devWallet.balance += amount;
  await user.save();

  const transaction = new Transaction({
    user_id: user._id,
    type: 'dev-credit',
    amount,
    currency: 'GBP',
    status: 'complete',
    source: 'devWallet',
    note: 'Manual top-up via devtools',
  });

  await transaction.save();

  return {
    status: 200,
    message: 'Wallet topped up',
    newBalance: user.devWallet.balance,
    transaction,
  };
}

module.exports = topUpDevWallet;
