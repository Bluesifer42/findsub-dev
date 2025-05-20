// ====================================================================
// 📂 Full File Path & Name: src/components/DevWalletTopUpButton.jsx
// 📌 Purpose: Dev-only button to simulate wallet top-up during development
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Only shown if user.devWallet.isDev === true
// 🔄 Related Backend Files: /api/devtools/top-up-wallet
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: On button click
// 🧪 Test Coverage: Manual test via SubscriptionSettings + TransactionHistory
// 🌐 Environment-Specific Logic: Hidden in production
// ⚡ Performance Notes: Very lightweight API call

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
// - Uses toast for error feedback (dev only)
// - Console logs all failures with context
//
// 📍 Navigation Standards:
// - Use inline in profile or wallet UI
//
// 🔁 API Integration:
// - Calls POST /api/devtools/top-up-wallet
//
// 🧰 Behavior Notes:
// - Assumes dev-only access via isDev flag
//
// ♿ Accessibility:
// - Uses button with clear label and hover state
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

import toast from 'react-hot-toast';

function DevWalletTopUpButton({ amount = 10, onSuccess }) {
  const handleTopUp = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch('http://localhost:5000/api/devtools/top-up-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Wallet topped up by £${amount}`);
        if (onSuccess) onSuccess(data);
      } else {
        toast.error(data.error || 'Top-up failed');
      }
    } catch (err) {
      console.error('[DevWalletTopUpButton] Error:', err);
      toast.error('Top-up error');
    }
  };

  return (
    <button
      onClick={handleTopUp}
      className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
    >
      💰 Top Up Dev Wallet (+£{amount})
    </button>
  );
}

export default DevWalletTopUpButton;
