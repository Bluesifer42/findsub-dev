// ====================================================================
// 📂 Full File Path & Name: /src/dashboards/RequireDashboard.jsx
// 📌 Purpose: Role-gated redirector that sends users to the correct dashboard based on role
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (redirects based on role logic inside component)
// 🔄 Related Backend Files: None (pure frontend redirect logic)
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: On initial render + user object availability
// 🔁 Performs: Role-based redirect to appropriate dashboard
// 🧪 Test Coverage: Manual UI validation only (integration test recommended)
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Lightweight, no DB/network calls, safe to memoize if needed

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

import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function RequireDashboard() {
  const { user, isLoading } = useUser();

  if (isLoading) return <p className="text-center mt-4">Loading dashboard...</p>;
  if (!user) return <Navigate to="/login" />;

  if (user.isAdmin) return <Navigate to="/dashboard/admin" />;
  if (user.role === 'Dom') return <Navigate to="/dashboard/dom" />;
  if (user.role === 'Sub') return <Navigate to="/dashboard/sub" />;
  if (user.role === 'Switch') return <Navigate to="/dashboard/switch" />;

  return <p>Unknown role: access denied.</p>;
}

export default RequireDashboard;
