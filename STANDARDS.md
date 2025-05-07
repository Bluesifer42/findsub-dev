
# FindSub Development Standards

These standards apply to all frontend React pages and components, as well as backend controllers and API logic.

## 📐 Coding Style
- ✅ Uses camelCase for variables, functions, and filenames.
- ✅ File naming uses PascalCase for React components, camelCase for others.
- ✅ Consistent indentation (2 spaces or configured via `.editorconfig`).

## 🌐 React + JSX
- ✅ Functional components only.
- ✅ All components should be fully annotated with purpose and logic.
- ✅ User interactions (errors, feedback, success) use `toast` not `alert`.
- ✅ Data fetched in `useEffect` with proper error handling.
- ✅ All states and effects clearly named and scoped.

## 🛠️ Backend + API
- ✅ All routes return raw data (not `{ data: [...] }` unless explicitly needed).
- ✅ API should use async/await with proper try/catch blocks.
- ✅ Controllers are modular and focused on single-responsibility.

## 🧠 Error Handling
- ✅ All API fetches use `try/catch`, log errors to console and UI via toast.
- ✅ Console logs must be descriptive (e.g. `[Jobs] Fetch error:`, not just `error:`).
- ✅ No `alert`, `prompt`, or inline `confirm` in production — use modals or toast.

## 🔍 Defensive Coding
- ✅ Always use `Array.isArray()` before `.map()` or `.length` access.
- ✅ Role logic must be scoped (e.g. `user.role === 'Dom'`), not hardcoded in logic branches.
- ✅ Always validate critical props (`jobId`, `user`, `applications` etc.)

## ✅ UX Consistency
- ✅ Pages should display meaningful messages on loading, success, and error.
- ✅ Pages should fail gracefully with fallback messages (e.g. "No jobs found.").

---

> Add this `Standards:` section at the top of every major file.

// ====================================================================
// 📂 Full File Path & Name: [replace with actual path]
// 📌 Purpose: [Short sentence explaining the file's intent or feature context]
// 🧩 File Type: React Page | Express Controller | Shared Component | Mongoose Model | Utility | Hook
// 🔐 Requires Authenticated User: true/false
// 🔐 Role Restricted: Dom | Sub | Switch | Any (enforced via `restrictToRole` middleware)
// 🔄 Related Backend Files: /routes/[RouteFile].js, /controllers/[ControllerFile].js
// 🔁 useEffect Hooks Used: true/false
// 🔁 Triggers: [e.g., selectedJobId change, form submission]
// 🔁 Performs: [e.g., fetch jobs, submit form, apply logic]
// 🧪 Test Coverage: [e.g., Unit tests in __tests__/FileName.test.js, Integration tests pending]
// 🌐 Environment-Specific Logic:[e.g., Dev-only logging, Production-only auth checks]
// ⚡ Performance Notes:[e.g., Memoized with React.memo, Avoids heavy renders]

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