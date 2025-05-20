// ====================================================================
// 📂 Full File Path & Name: src/pages/profile/TransactionHistory.jsx
// 📌 Purpose: Show a user-facing history of all dev/test/upgrade payment transactions
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch | Voyeur
// 🔄 Related Backend Files: /api/transactions/user/:id
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: On load, userId change
// 🔁 Performs: Fetch and display transaction log
// 🧪 Test Coverage: Manual UI test via dev wallet and upgrade usage
// 🌐 Environment-Specific Logic: Color codes dev/test transactions
// ⚡ Performance Notes: Sorted on backend; no pagination for now

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
// - Uses toast or fallback text if transaction fetch fails
// - Skips broken entries safely
//
// 📍 Navigation Standards:
// - Use <Link to="/profile/transactions"> to access from nav
//
// 🧭 Parent/Child Layout Standards:
// - Page-level route under profile
//
// 🧱 Responsive & Layout Standards:
// - Uses `max-w-3xl mx-auto` layout for visual consistency
//
// 🧪 Testing/Debugging Aids:
// - Logs errors from failed fetches
//
// 🚨 ESLint / Prettier:
// - Adheres to airbnb style
//
// 🔒 Security Notes:
// - Only fetches data for current user
//
// 🔁 API Integration:
// - Hits /api/transactions/user/:id
//
// 🧰 Behavior Notes:
// - Dev transactions clearly labeled
//
// ♿ Accessibility:
// - Simple tabular layout, accessible heading + row structure
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

import { useEffect, useState } from 'react';

function TransactionHistory() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      fetchTransactions(parsed._id);
    }
  }, []);

  const fetchTransactions = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/transactions/user/${userId}`);
      const data = await res.json();
      if (res.ok) setTransactions(data.transactions || []);
    } catch (err) {
      console.error('Failed to load transactions:', err);
    }
  };

  if (!user) return <p className="text-center">Loading transactions...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-sm text-gray-600">No transactions found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((txn, i) => (
            <li key={i} className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm">
                  <strong>{txn.type}</strong> — <span className="capitalize">{txn.source}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(txn.created_at).toLocaleString()} — {txn.status}
                </p>
                {txn.note && <p className="text-xs italic text-gray-400">{txn.note}</p>}
              </div>
              <p
                className={`font-bold ${
                  txn.type === 'dev-credit'
                    ? 'text-green-600'
                    : txn.type === 'upgrade'
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                £{txn.amount.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionHistory;
