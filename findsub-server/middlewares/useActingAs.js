// ====================================================================
// 📂 Full File Path & Name: /middlewares/useActingAs.js
// 📌 Purpose: Determines and validates the user's current acting role (Dom or Sub) based on header and profile
// 🧩 File Type: Express Middleware
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Valid Dom/Sub role only
// 🔄 Related Backend Files: Jobs, Applications, Feedback (role-tagged actions)
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Applied to any POST/PUT route where role matters
// 🔁 Performs: Checks `x-acting-as` header, validates against roles_available
// 🧪 Test Coverage: Manual and Switch user flow testing
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Single DB fetch to validate shared profile roles

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

const User = require('../models/User');
const SharedProfile = require('../models/SharedProfile');

async function useActingAs(req, res, next) {
  try {
    const actingAs = req.headers['x-acting-as'];

    if (!actingAs || !['dom', 'sub'].includes(actingAs.toLowerCase())) {
      return res.status(400).json({ error: 'Missing or invalid x-acting-as header' });
    }

    const user = await User.findById(req.user.id);
    if (!user || !user.sharedProfileId) {
      return res.status(403).json({ error: 'User not linked to shared profile' });
    }

    const shared = await SharedProfile.findById(user.sharedProfileId);
    if (!shared) return res.status(403).json({ error: 'Shared profile not found' });

    const role = actingAs.toLowerCase();
    
    if (shared.role_locks && shared.role_locks[role]) {
    return res.status(403).json({ error: `Role '${role}' is currently locked by an administrator.` });
}

    const hasRole = shared.roles_available.includes(role);
    if (!hasRole) {
      const archivedMatch = shared.archived_roles.some(ar => ar.role === role);
      if (archivedMatch) {
        return res.status(403).json({ error: `Role '${role}' has been archived and cannot perform new actions.` });
      }
      return res.status(403).json({ error: `User is not permitted to act as ${role}` });
    }

    req.actingAs = role; // ✅ Store cleanly
    next();
  } catch (err) {
    console.error('[useActingAs ERROR]', err);
    res.status(500).json({ error: 'Failed to determine acting role' });
  }
}

module.exports = useActingAs;
