// ====================================================================
// 📂 Full File Path & Name: /src/utils/roles.js
// 📌 Purpose: Provides centralized metadata for Dom, Sub, Switch, and Voyeur roles
// 🧩 File Type: Utility
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: None
// 🔄 Related Backend Files: /models/User.js, used in frontend signup, upgrade, and access control
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Used for rendering dropdowns and role labels
// 🔁 Performs: Returns available roles, their labels, pricing, and restrictions
// 🧪 Test Coverage: N/A (pure static config)
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Zero-runtime overhead

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
// - DO NOT EDIT THIS SECTION ======================================

export const ROLE_DATA = {
  voyeur: {
    id: 'voyeur',
    label: 'Voyeur',
    signupAvailable: true,
    description: 'Explore profiles and community areas without Dom/Sub commitments',
    price: 1.00,
    requiresUpgrade: false,
    restricted: true
  },
  dom: {
    id: 'dom',
    label: 'Dom',
    signupAvailable: true,
    description: 'Post tasks and find submissives to serve your needs',
    price: 4.99,
    requiresUpgrade: false,
    restricted: false
  },
  sub: {
    id: 'sub',
    label: 'Submissive',
    signupAvailable: true,
    description: 'Apply to jobs and serve Doms in person or online',
    price: 4.99,
    requiresUpgrade: false,
    restricted: false
  },
  switch: {
    id: 'switch',
    label: 'Switch',
    signupAvailable: true,
    description: 'Unlock both Dom and Sub modes',
    price: 7.99,
    requiresUpgrade: true,
    restricted: false
  }
};

/**
 * Returns array of signup-available roles
 */
export function getAvailableRoles() {
  return Object.values(ROLE_DATA).filter(role => role.signupAvailable);
}

/**
 * Returns full role object by id (e.g. 'dom')
 */
export function getRoleInfo(roleId) {
  return ROLE_DATA[roleId?.toLowerCase()] || null;
}
