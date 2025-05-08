// ====================================================================
// 📂 Full File Path & Name: /src/context/useAuth.js
// 📌 Purpose: Custom React hook to expose user context values and handle logout
// 🧩 File Type: Hook
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: /routes/AuthRoutes.js, /controllers/AuthController.js
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: logout action, user context changes
// 🔁 Performs: Clears user state and localStorage on logout
// 🧪 Test Coverage: None yet; should test logout state and context clearance
// 🌐 Environment-Specific Logic: Logs tokens to console in dev
// ⚡ Performance Notes: Stateless, memoization not required

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

import { useContext } from 'react';
import { UserContext } from './UserContext';

export const useAuth = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    console.log('🚪 [Logout] Removing user and token...');
    console.log('📦 Token before removal:', localStorage.getItem('token'));

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);

    console.log('🧹 Token after removal:', localStorage.getItem('token')); // Should log null
  };

  return { user, setUser, logout };
};
