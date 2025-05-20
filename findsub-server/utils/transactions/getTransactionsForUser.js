// ====================================================================
// 📂 Full File Path & Name: /utils/transactions/getTransactionsForUser.js
// 📌 Purpose: Fetch all transactions for a given user (sorted by newest first)
// 🧩 File Type: Controller Helper
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/TransactionRoutes.js, /controllers/TransactionController.js
// 👩‍👦 Is a child component : false
// ====================================================================

const Transaction = require('../../models/Transaction');

async function getTransactionsForUser(userId) {
  const transactions = await Transaction.find({ user_id: userId })
    .sort({ created_at: -1 })
    .lean();
  return transactions;
}

module.exports = getTransactionsForUser;
