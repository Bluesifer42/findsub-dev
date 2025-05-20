// ====================================================================
// 📂 Full File Path & Name: src/layout/Header.jsx
// 📌 Purpose: Sticky header showing role toggle and logout for authenticated users
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch
// 🔄 Related Backend Files: useActingAs middleware, RoleContext
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: actingAs toggle, logout
// 🔁 Performs: Sets global role context, displays nav and logout
// 🧪 Test Coverage: Manual QA on switch logic
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Stateless component aside from RoleContext use

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
// - React Router <Link> for internal routing
// - Direct route changes use navigate('/path')
// - Section layouts (e.g., JobsHub) use <Outlet /> to render tab-aware nested views
//
// 🧭 Parent/Child Layout Standards:
// - Top-level layout header; wraps all main routes
//
// 🧱 Responsive & Layout Standards:
// - Sticky, shadowed, horizontal bar
//
// 🧪 Testing/Debugging Aids:
// - Console logs for toggle/role change only if needed
//
// 🚨 ESLint / Prettier:
// - Adheres to airbnb style
//
// 🔒 Security Notes:
// - Never exposes token
//
// 🔁 API Integration:
// - Sends `x-acting-as` in job/feedback contexts
//
// 🧰 Behavior Notes:
// - All tabs conditionally render based on this role
//
// ♿ Accessibility:
// - WCAG compliant labels + tab indexes
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

import { useAuth } from '../context/useAuth';
import { useRole } from '../context/RoleContext';

function Header() {
  const { user, logout } = useAuth();
  const { actingAs, setActingAs } = useRole();

  const isSwitch = user?.sharedProfile?.roles_available?.length === 2;

  const handleToggle = (e) => {
    setActingAs(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold tracking-tight">FindSub</h1>

        {user && (
          <span className="text-sm text-gray-600">
            Logged in as <strong>{user.username}</strong>
          </span>
        )}

        {isSwitch && (
          <div className="ml-4">
            <label htmlFor="actingAs" className="text-sm text-gray-500 mr-2">
              Acting as:
            </label>
            <select
              id="actingAs"
              value={actingAs}
              onChange={handleToggle}
              className="text-sm border border-gray-300 px-2 py-1 rounded"
            >
              {user.sharedProfile.roles_available.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {user && (
        <button
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
