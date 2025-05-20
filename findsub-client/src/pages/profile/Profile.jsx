// ====================================================================
// 📂 Full File Path & Name: src/pages/profile/Profile.jsx
// 📌 Purpose: Full editable profile page for logged-in users
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /api/users/update, /api/users/verify
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: On load, user change
// 🧪 Test Coverage: Manual test via UI edit + mock verification
// 🌐 Environment-Specific Logic: Uses localhost in dev
// ⚡ Performance Notes: Profile data stored locally
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

function Profile() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/users/update/${user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setStatus('✅ Profile updated.');
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to update profile.');
    }
  };

  const handleVerify = async (type) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/verify/${type}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (res.ok) setStatus(`✅ ${type} verified`);
      else setStatus(`❌ ${data.message}`);
    } catch (err) {
      console.error(err);
      setStatus(`❌ Failed to verify ${type}`);
    }
  };

  if (!user) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit My Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          name="displayName"
          value={user.displayName || ''}
          onChange={handleChange}
          placeholder="Display Name"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="bio"
          value={user.bio || ''}
          onChange={handleChange}
          placeholder="Your bio..."
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
      <div className="mt-4 space-x-2">
        <button onClick={() => handleVerify('email')} className="bg-green-600 text-white px-3 py-1 rounded">
          Verify Email
        </button>
        <button onClick={() => handleVerify('phone')} className="bg-yellow-600 text-white px-3 py-1 rounded">
          Verify Phone
        </button>
      </div>
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
}

export default Profile;
