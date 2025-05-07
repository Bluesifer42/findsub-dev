// ====================================================================
// 📂 Full File Path & Name: /src/hooks/useUser.js
// 📌 Purpose: Custom React hook to manage the logged-in user state from localStorage and expose role-based flags.
// 🧩 File Type: Hook
// 🔐 Requires Authenticated User: false (used to *check* authentication status)
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: None (reads from frontend localStorage only)
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: component mount
// 🔁 Performs: fetch user from localStorage, expose identity flags (isDom, isSub, etc.)
// 🧪 Test Coverage: No automated tests yet; manually verified across role-based components
// 🌐 Environment-Specific Logic: Dev-only logging on load error
// ⚡ Performance Notes: Extremely lightweight; memoization unnecessary

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

import { useEffect, useState } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: !!user?.isAdmin,
    isDom: user?.role === 'Dom',
    isSub: user?.role === 'Sub',
    isSwitch: user?.role === 'Switch',
  };
  
}
