// ====================================================================
// 📂 Full File Path & Name: src/pages/profile/SubscriptionSettings.jsx
// 📌 Purpose: Display subscription status, handle upgrade flow, and show devWallet
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch | Voyeur
// 🔄 Related Backend Files: /api/upgrade-role
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: On load, upgrade confirmation
// 🔁 Performs: Load user subscription, trigger upgrade via modal
// 🧪 Test Coverage: Manual QA with devWallet and Switch upgrades
// 🌐 Environment-Specific Logic: Shows devWallet if `isDev` true
// ⚡ Performance Notes: Fully local except upgrade API call

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
// - Uses toast for user-visible errors (via react-hot-toast or react-toastify)
// - Logs errors to console: `[FileName:FunctionName] Error: [message], Payload: [payload]`
// - Avoids alert()/prompt() except in critical cases with justification
//
// 📍 Navigation Standards:
// - Use <Link> for static in-app navigation (e.g., navbars, sidebars)
// - Use navigate('/path') for dynamic redirection (e.g., after logout or submit)
// - Use <Outlet /> inside wrapper layouts (e.g., JobsHub) to render nested child routes contextually
//
// 🧭 Parent/Child Layout Standards:
// - All child pages must wrap content using <LayoutWrapper><div className="max-w-6xl mx-auto">...</div></LayoutWrapper>
// - Child pages must not define layout independently; spacing, width, and behavior are inherited from parent.
// - Use `// 👩‍👦 Is a child component : True/[ParentPageName]` to explicitly document layout hierarchy.
//
// 🧱 Responsive & Layout Standards:
// - All pages except auth use <LayoutWrapper> for consistent page sizing, scroll control, and sidebar injection
//
// 🧪 Testing/Debugging Aids:
// - Console logs: `[FileName DEBUG] [message]`
// - Logs API payloads/responses in development only
//
// 🚨 ESLint / Prettier:
// - Adheres to airbnb style, indentation: 2 spaces (no tabs)
// - Exceptions: `// eslint-disable-line [rule] - [reason]`
//
// 🔒 Security Notes:
// - Sanitizes user input via sanitize-html (frontend) and express-validator (backend)
// - Prevents XSS via Helmet middleware
//
// 🔁 API Integration:
// - All calls made via centralized api.js
// - Raw data returned, transformed only in consuming component
//
// 🧰 Behavior Notes:
// - Flexible opt-in props (e.g., noPadding, fullWidth). Defaults enforce consistent layout unless explicitly overridden.
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpgradeModal from '../../components/UpgradeModal';
import {
  isSubscriptionExpired,
  isSwitchActive,
  isVoyeurOnly,
  isSingleRoleUser,
  getPrimaryRole
} from '../../utils/subscriptionCheck';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/useAuth';
import { removeRole } from '../../utils/api';

function SubscriptionSettings() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleUpgrade = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/upgrade-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
          'x-acting-as': user.role,
        },
        body: JSON.stringify({ upgradeTo: 'switch' }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setStatus('✅ Upgrade successful!');
      } else {
        setStatus(`❌ ${data.error || 'Upgrade failed'}`);
      }
    } catch (err) {
      console.error('Upgrade error:', err);
      setStatus('❌ Failed to upgrade account.');
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    handleUpgrade();
  };

  const handleRetire = async (role) => {
    if (!window.confirm(`Are you sure you want to retire your ${role} role? This cannot be undone.`)) return;

    try {
      await removeRole(role);
      toast.success(`${role} role retired successfully`);
      window.location.reload();
    } catch (err) {
      toast.error(err?.error || 'Failed to retire role');
    }
  };

  if (!user) return <p className="text-center">Loading subscription...</p>;

  const expired = isSubscriptionExpired(user);
  const switchEnabled = isSwitchActive(user);
  const devWallet = user.devWallet?.isDev ? user.devWallet.balance : null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Subscription Settings</h2>

      {expired && (
        <div className="mb-4 bg-red-100 border border-red-300 p-3 rounded">
          <p className="text-red-700 font-semibold">⛔ Your subscription has expired.</p>
          <p className="text-sm text-red-600">Upgrade or renew to regain full access.</p>
        </div>
      )}

      <div className="bg-gray-100 border p-4 rounded">
        <p><strong>Base Plan:</strong> {user.subscription?.basePlan || 'Free'}</p>
        <p><strong>Status:</strong> {expired ? '⛔ Expired' : '✅ Active'}</p>

        {switchEnabled ? (
          <p><strong>Switch Enabled:</strong> Yes — both roles unlocked</p>
        ) : (
          isSingleRoleUser(user) && (
            <div className="mt-4">
              <p className="text-yellow-800 mb-2">
                You're currently acting as <strong>{getPrimaryRole(user)}</strong>. Upgrade to unlock full Switch access.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                🔓 Upgrade to Switch
              </button>
            </div>
          )
        )}
      </div>

      {devWallet !== null && (
        <div className="mt-6 bg-green-100 border border-green-300 p-4 rounded">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🧪 Dev Wallet</h3>
          <p className="text-green-700">Balance: £{devWallet.toFixed(2)}</p>
        </div>
      )}

      {user?.sharedProfile?.roles_available?.length > 1 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">🧯 Retire One of Your Roles</h3>
          <p className="text-sm text-gray-600 mb-3">
            Once retired, a role is locked and cannot be used for job actions. You will keep past feedback and history.
          </p>
          <div className="flex gap-3">
            {user.sharedProfile.roles_available.map((role) => (
              <button
                key={role}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
                onClick={() => handleRetire(role)}
              >
                Retire {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}

      <UpgradeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}

export default SubscriptionSettings;
