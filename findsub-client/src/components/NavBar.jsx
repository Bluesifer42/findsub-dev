// ====================================================================
// 📂 Full File Path & Name: /src/components/NavBar.jsx
// 📌 Purpose: Top-level navigation bar for the app, handles login state and navigation.
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: None (client-only component)
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Auth state change, logout button click
// 🔁 Performs: Displays nav state, triggers logout, routes on click
// 🧪 Test Coverage: Manual test via UI; integration test pending
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Lightweight; stateless except for logout side-effect

// - DO NOT EDIT THIS SECTION ======================================

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
// - React Router <Link> for internal routing
// - Direct route changes use navigate('/path')
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
// - Sanitizes inputs via `sanitize-html`
// - Prevents XSS via Helmet middleware
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// - DO NOT EDIT THIS SECTION ======================================

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function NavBar() {
  const { user, logout } = useAuth(); // ✅ Clean access
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate('/login');
    }, 100); // 100ms delay
  };

  return (
    <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide hover:text-blue-300">
        FindSub
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-sm">Not logged in</span>
        )}
      </div>
    </header>
  );
}

export default NavBar;
