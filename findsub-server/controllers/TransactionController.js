// ====================================================================
// 📂 Full File Path & Name: /controllers/TransactionController.js
// 📌 Purpose: Handles transaction fetching and dev wallet top-up logic
// 🧩 File Type: Express Controller
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: All (top-up allowed only if user.devWallet.isDev === true)
// 🔄 Related Backend Files: TransactionRoutes.js, User.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: dev top-up button, history page
// 🧪 Test Coverage: DevTools and TransactionHistory UI
// 🌐 Environment-Specific Logic: Top-up disabled in production
// ⚡ Performance Notes: Uses lean query for log retrieval

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================
//
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
// - All endpoints log error + return safe JSON
// - All POSTs validate devWallet access
//
// 📍 Navigation Standards:
// - Not route-aware; responds to /api/transactions/* only
//
// 🧭 Parent/Child Layout Standards:
// - Not layout-driven (backend only)
//
// 🧱 Responsive & Layout Standards:
// - N/A
//
// 🧪 Testing/Debugging Aids:
// - Logs all dev top-ups and transaction fetch hits
//
// 🚨 ESLint / Prettier:
// - Adheres to airbnb standards
//
// 🔒 Security Notes:
// - Requires valid JWT token
// - Top-up locked to isDev flag
//
// 🔁 API Integration:
// - Returned transactions used in TransactionHistory.jsx
//
// 🧰 Behavior Notes:
// - Never deletes; append-only log system
//
// ♿ Accessibility:
// - Not visual
//
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

console.log('📦 /controllers/TransactionController.js mounted');

exports.getTransactionsForUser = require('../utils/transactions/getTransactionsForUser');
exports.topUpDevWallet = require('../utils/transactions/topUpDevWallet');
