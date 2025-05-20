// ====================================================================
// 📂 Full File Path & Name: src/pages/PublicProfile.jsx
// 📌 Purpose: Display public-facing SharedProfile based on displayName param
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any (publicly accessible)
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: On mount, route param change
// 🔁 Performs: Load SharedProfile by displayName, shows tabbed role view
// 🧪 Test Coverage: Pending integration test pass
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Lightweight, single query fetch

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
import { useParams } from 'react-router-dom';
import { getSharedProfileByDisplayName } from '../../utils/api';

function PublicProfile() {
  const { displayName } = useParams();
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState('dom');
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const data = await getSharedProfileByDisplayName(displayName);
      setProfile(data.profile);
    } catch (err) {
      console.error('[PublicProfile] Failed:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, [displayName]);

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!profile) return <p className="text-center text-red-600">User not found.</p>;

  const { avatar_url, bio, roles_available, reputation } = profile;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center space-x-4 mb-4">
        <img src={avatar_url || '/placeholder-avatar.png'} alt="Avatar" className="w-16 h-16 rounded-full border" />
        <div>
          <h2 className="text-2xl font-bold">{profile.display_name}</h2>
          <p className="text-sm text-gray-600">{bio || 'No bio provided.'}</p>
        </div>
      </div>

      {roles_available.length > 1 && (
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setTab('dom')}
            className={`px-4 py-2 rounded ${tab === 'dom' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            As Dom
          </button>
          <button
            onClick={() => setTab('sub')}
            className={`px-4 py-2 rounded ${tab === 'sub' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            As Sub
          </button>
        </div>
      )}

      <div className="bg-gray-100 p-4 rounded border">
        <h3 className="text-lg font-semibold mb-2">Reputation</h3>
        <p><strong>Dom:</strong> {reputation?.dom ?? 0}</p>
        <p><strong>Sub:</strong> {reputation?.sub ?? 0}</p>
      </div>

      {/* 📸 Future Gallery or Badges */}
      <div className="mt-6 text-sm text-gray-400 italic">
        Badges and photo gallery coming soon...
      </div>
    </div>
  );
}

export default PublicProfile;
