// ====================================================================
// 📂 Full File Path & Name: /routes/TransactionRoutes.js
// 📌 Purpose: Route layer for transaction logging, retrieval, and dev wallet actions
// 🧩 File Type: Express Route Module
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (admin-only top-up, user-restricted GET)
// 🔄 Related Backend Files: /controllers/TransactionController.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Transaction fetch, devWallet top-up
// 🧪 Test Coverage: Will be covered in Phase 7(b)
// 🌐 Environment-Specific Logic: Top-up route only active in dev
// ⚡ Performance Notes: Read-optimized via indexed `user_id`

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
// - All GET/POST routes wrapped in try/catch
// - User ID validation enforced
//
// 📍 Navigation Standards:
// - Use navigate('/transactions') to link to history
//
// 🧭 Parent/Child Layout Standards:
// - Not layout-aware (backend only)
//
// 🧱 Responsive & Layout Standards:
// - N/A (backend)
//
// 🧪 Testing/Debugging Aids:
// - Console logs for all route hits in dev mode
//
// 🚨 ESLint / Prettier:
// - Adheres to airbnb style, indentation: 2 spaces
//
// 🔒 Security Notes:
// - All POST routes require valid token
// - Top-up route requires isDev === true
//
// 🔁 API Integration:
// - Returns raw data: transaction objects
//
// 🧰 Behavior Notes:
// - GET endpoint is used in TransactionHistory.jsx
//
// ♿ Accessibility:
// - N/A (not visual)
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

console.log('📦 /routes/TransactionRoutes.js mounted');

const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/TransactionController');
const verifyToken = require('../middlewares/verifyToken');

// ✅ GET: All transactions for a user
router.get('/user/:userId', verifyToken, TransactionController.getTransactionsForUser);

// ✅ POST: Add a dev wallet credit (restricted to dev mode only)
router.post('/devtools/top-up-wallet', verifyToken, TransactionController.topUpDevWallet);

module.exports = router;
