// ====================================================================
// 📂 Full File Path & Name: /src/context/UserContext.jsx
// 📌 Purpose: Provide global user context (auth, role, ID, etc.) across the app
// 🧩 File Type: Shared Component (React Context Provider)
// 🔐 Requires Authenticated User: false (but reads from localStorage if available)
// 🔐 Role Restricted: Any
// 🔄 Related Backend Files: none (uses localStorage only)
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: Component mount
// 🔁 Performs: Load user from localStorage and provide context to children
// 🧪 Test Coverage: No dedicated tests (logic covered via components using useUser())
// 🌐 Environment-Specific Logic: Dev console logging only
// ⚡ Performance Notes: Minimal state; memoization not needed

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
// - Job views: In-tab detail loading in JobsHub via selectedJobId state (mobile uses embedded view)
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

import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      console.log('📦 [UserContext] Loaded user from localStorage:', JSON.parse(stored));
      setUser(JSON.parse(stored));
    } else {
      console.log('🕳 [UserContext] No user found in localStorage');
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
