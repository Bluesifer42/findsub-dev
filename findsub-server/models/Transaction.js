// ====================================================================
// 📂 Full File Path & Name: /models/Transaction.js
// 📌 Purpose: Stores financial or dev-related transactions for each user
// 🧩 File Type: Mongoose Model
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (user-specific access enforced)
// 🔄 Related Backend Files: /routes/TransactionRoutes.js, /controllers/TransactionController.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: upgrade-role, devWallet top-up, admin tools
// 🧪 Test Coverage: Included in Phase 7(b)
// 🌐 Environment-Specific Logic: Dev-only top-ups allowed only if `user.devWallet.isDev` is true
// ⚡ Performance Notes: Indexed on user_id and created_at

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================

// 📦 Data Shape:
// - Incoming API payloads: camelCase
// - MongoDB schema fields: snake_case
// - Internal React state/props/vars: camelCase
// - Kink references: ObjectId for DB queries; { _id, name, description } for UI display
//
// 🎯 Casing Conventions:
// - MongoDB Collection Fields: snake_case
// - Mongoose Model Fields: snake_case
// - API Request/Response Payloads: camelCase
// - JavaScript Variables & Functions: camelCase
// - React Components: PascalCase
// - CSS Classnames (Tailwind/Custom): kebab-case
//
// ❗ Error Handling Strategy:
// - All inserts are validated via Mongoose schema
// - Catch blocks in controller handle response formatting
//
// 🔁 API Integration:
// - All API interactions logged automatically when payment-related routes are triggered
// - Transactions will eventually tie into real billing logic (e.g. Stripe)
//
// 🧰 Behavior Notes:
// - Non-destructive: transactions are never deleted
// - Used for dev-only billing simulation and future Stripe billing records
//
// ♿ Accessibility:
// - Not UI-rendered directly; frontend renders from `/transactions/user/:id`
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: {
    type: String,
    enum: ['upgrade', 'topup', 'dev-credit', 'admin-adjustment', 'stripe-charge'],
    required: true,
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'GBP' },
  status: {
    type: String,
    enum: ['complete', 'pending', 'failed'],
    default: 'complete',
  },
  source: {
    type: String,
    enum: ['devWallet', 'stripe', 'admin', 'system'],
    default: 'system',
  },
  note: { type: String, default: '' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
