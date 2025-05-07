// ====================================================================
// 📂 Full File Path & Name: /src/dashboards/Sub/index.jsx
// 📌 Purpose: Sub dashboard entry page to greet and validate Sub users
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Sub (enforced via useUser and isSub)
// 🔄 Related Backend Files: N/A (reads from frontend UserContext only)
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: UserContext data load (via useUser)
// 🔁 Performs: Role check, renders Sub-specific dashboard welcome
// 🧪 Test Coverage: Minimal unit coverage, integration tested via dashboard route
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Lightweight, no unnecessary re-renders

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
import { useUser } from '../../hooks/useUser';

function DashboardSub() {
  const { user, isLoading, isSub } = useUser();

  if (isLoading || !user) return <p>Loading dashboard...</p>;
  if (!isSub) return <p>Access denied. Sub only.</p>;

  return <h2>Welcome Sub: {user.username}</h2>;
}

export default DashboardSub;
