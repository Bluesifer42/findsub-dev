// ====================================================================
// 📂 Full File Path & Name: src/components/RoleToggle.jsx
// 📌 Purpose: Toggle between acting as Dom or Sub for Switch users
// 🧩 File Type: React Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch
// 🔄 Related Backend Files: useActingAs middleware, SharedProfile.roles_available
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: User role toggle
// 🧪 Test Coverage: Manual toggle test on dashboard and profile pages
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Reads/writes to localStorage once per toggle
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

import { useRole } from '../context/RoleContext';
import { useEffect, useState } from 'react';

function RoleToggle({ rolesAvailable }) {
  const { actingAs, setActingAs } = useRole();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!rolesAvailable || rolesAvailable.length < 2) return null;

  const toggleRole = (role) => {
    setActingAs(role);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        Acting as: <span className="font-semibold capitalize">{actingAs}</span> ▼
      </button>

      {showDropdown && (
        <div className="absolute mt-1 w-32 bg-white border border-gray-300 shadow rounded">
          {rolesAvailable
            .filter(role => role !== actingAs)
            .map((role) => (
              <button
                key={role}
                onClick={() => toggleRole(role)}
                className="block w-full text-left px-3 py-1 hover:bg-gray-100 text-sm capitalize"
              >
                Switch to {role}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default RoleToggle;
