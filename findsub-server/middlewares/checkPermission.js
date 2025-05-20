// ====================================================================
// 📂 Full File Path & Name: /middlewares/checkPermission.js
// 📌 Purpose: Validates that an authenticated Admin user has a specific permission
// 🧩 File Type: Express Middleware
// 🔐 Requires Authenticated User: true (via verifyToken)
// 🔐 Role Restricted: Admin only
// 🔄 Related Backend Files: Used across admin-protected routes
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Express middleware before route controller
// 🔁 Performs: Validates permissions[] from AdminProfile
// 🧪 Test Coverage: Included in permission-guarded admin actions test
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes: Efficient single DB lookup with lean()

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================
//
// 📦 Data Shape:
// - Incoming API payloads: camelCase
// - MongoDB schema fields: snake_case
// - Internal React state/props/vars: camelCase
// - Kink references: ObjectId for DB queries; { _id, name, description } for UI display
// - Admins use `adminProfileId` (ref: AdminProfile)
// - Admins may include `permissions: [String]`, `isOwner: Boolean`, `isProtected: Boolean`
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
// - Admins cannot be created via public signup
// - Destructive actions on admin accounts require permission flags or isOwner=true
//
// 🔁 API Integration:
// - All calls made via centralized api.js
// - Raw data returned, transformed only in consuming component
// - Admin actions must verify `role === 'Admin'` and proper `permissions[]`
//
// 🧰 Behavior Notes:
// - Flexible opt-in props (e.g., noPadding, fullWidth). Defaults enforce consistent layout unless explicitly overridden.
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
// - Admin dashboards, tables, and forms must meet same accessibility standards
//
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
// - Admin checks (e.g. isSuperAdmin, hasPermission) live in /utils/adminCheck.js
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

const AdminProfile = require('../models/AdminProfile');

module.exports = function checkPermission(requiredPermission) {
  return async function (req, res, next) {
    try {
      const user = req.user;

      if (!user || user.role !== 'Admin' || !user.adminProfileId) {
        return res.status(403).json({ error: 'Access denied.' });
      }

      const adminProfile = await AdminProfile.findById(user.adminProfileId).lean();
      if (!adminProfile) return res.status(403).json({ error: 'Admin profile not found.' });

      if (!adminProfile.permissions.includes(requiredPermission)) {
        console.warn(`[checkPermission] Admin ${user._id} lacks "${requiredPermission}"`);
        return res.status(403).json({ error: 'Insufficient permissions.' });
      }

      next();
    } catch (err) {
      console.error('[checkPermission] Middleware error:', err);
      res.status(500).json({ error: 'Permission check failed.' });
    }
  };
};
