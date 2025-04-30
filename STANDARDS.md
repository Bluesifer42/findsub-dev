
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

> Add this `Standards:` section at the top of every major `.jsx` file:
```js
// Standards:
// - Uses camelCase
// - Fully annotated code
// - Uses toast for user messages (not alert/prompt)
// - Returns raw data from backend
// - Full error handling and logging
// - Defensive array checks before map()
// - Auth data via UserContext
```

