// ====================================================================
// 📂 Full File Path & Name: src/pages/profile/ProfileOverview.jsx
// 📌 Purpose: Display a unified view of a user's SharedProfile (identity, avatar, bio, and available roles)
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (Dom, Sub, Switch, Voyeur)
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: On mount — fetches shared profile for current user
// 🧪 Test Coverage: Manual (mock data OK until auth is live)
// 🌐 Environment-Specific Logic: Relies on /me endpoint (or mock until real auth)
// ⚡ Performance Notes: Lightweight fetch and state

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
import RoleToggle from '../../components/RoleToggle';
import FeedbackTabs from '../../components/FeedbackTabs';

function ProfileOverview() {
  const [sharedProfile, setSharedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSharedProfile();
  }, []);

  const fetchSharedProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/me/shared-profile');
      const data = await res.json();
      setSharedProfile(data);
    } catch (err) {
      console.error('[ProfileOverview] Failed to load shared profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!sharedProfile) return <p className="text-center text-red-600">No profile found.</p>;

  const { display_name, avatar_url, bio, roles_available = [] } = sharedProfile;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Your Shared Profile</h1>

      <div className="flex gap-6 items-start flex-wrap">
        <img
          src={avatar_url || '/default-avatar.png'}
          alt="User avatar"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{display_name}</h2>
            {roles_available.length > 1 && (
              <RoleToggle rolesAvailable={roles_available} />
            )}
          </div>

          <p className="text-gray-700 mt-1">{bio || 'No bio yet.'}</p>

          <div className="mt-4">
            <p className="font-medium">Roles Available:</p>
            <ul className="list-disc ml-5">
              {roles_available.map((role) => (
                <li key={role} className="capitalize">{role}</li>
              ))}
            </ul>
          </div>

          {roles_available.length === 1 && (
            <div className="mt-4">
              <p className="text-yellow-700 font-semibold">
                ⚠️ Upgrade to unlock full Switch features.
              </p>
              <button
                onClick={() => navigate('/upgrade')}
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                🔓 Upgrade to Switch
              </button>
            </div>
          )}

          {roles_available.length === 0 && (
            <div className="mt-4">
              <p className="text-red-700 font-semibold">
                You’re currently in Voyeur mode — job access is restricted.
              </p>
              <button
                onClick={() => navigate('/upgrade')}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                🚀 Upgrade Now
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">📝 Feedback Received</h3>
        <FeedbackTabs userId={sharedProfile._id} />
      </div>
    </div>
  );
}

export default ProfileOverview;
