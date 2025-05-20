// ====================================================================
// 📂 Full File Path & Name: /middlewares/hasAccessToRole.js
// 📌 Purpose: Ensures the authenticated user has permission to act as a given role (Dom or Sub)
// 🧩 File Type: Express Middleware
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Controlled dynamically via function param
// 🔄 Related Backend Files: All routes that require Dom/Sub gating
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Any backend route requiring role-based access control
// 🔁 Performs: Checks base role or linked role unlocked via Switch
// 🧪 Test Coverage: Manual testing with Dom/Sub/Switch accounts
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: One DB read to support linked account access

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

function hasAccessToRole(requiredRole) {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      if (user.role === 'Voyeur') {
        return res.status(403).json({ error: 'Voyeur accounts cannot perform this action' });
      }

      const roleMatches = user.role === requiredRole;
      const hasSwitch = user.subscription?.isSwitchUnlocked;

      if (roleMatches) {
        return next(); // ✅ Matches base role
      }

      if (hasSwitch && user.linkedAccountId) {
        const linked = await User.findById(user.linkedAccountId);
        if (linked?.role === requiredRole) {
          return next(); // ✅ Matches unlocked opposite role
        }
      }

      return res.status(403).json({ error: `Access to ${requiredRole} role denied.` });
    } catch (err) {
      console.error('[hasAccessToRole ERROR]', err);
      res.status(500).json({ error: 'Role validation failed' });
    }
  };
}

module.exports = hasAccessToRole;
