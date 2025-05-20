// ====================================================================
// 📂 Full File Path & Name: /middlewares/chargeDevWallet.js
// 📌 Purpose: Middleware to simulate wallet charges in dev mode using mockPaymentProcessor
// 🧩 File Type: Express Middleware
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (must have devWallet)
// 🔄 Related Backend Files: /utils/payments/mockPaymentProcessor.js
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: On any request requiring payment simulation
// 🔁 Performs: Deducts balance and blocks request on insufficient dev funds
// 🧪 Test Coverage: Manual dev testing in register and upgrade routes
// 🌐 Environment-Specific Logic: Executes only when `NODE_ENV !== 'production'`
// ⚡ Performance Notes: Lightweight, no DB queries unless payment attempted

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

const { charge } = require('../utils/payments/mockPaymentProcessor');

function chargeDevWallet(amount, reason = 'Test charge') {
  return async (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      return next(); // Skip in prod
    }

    try {
      const user = req.user || req.devUser || req.localUser;
      if (!user || !user.devWallet || !user.devWallet.isDev) {
        return res.status(400).json({ error: '[DEV PAYMENT] User wallet missing or invalid' });
      }

      const result = await charge(user, amount, reason);

      if (!result.success) {
        return res.status(402).json({ error: result.message });
      }

      req.paymentStatus = result;
      next();
    } catch (err) {
      console.error('[chargeDevWallet ERROR]', err);
      res.status(500).json({ error: 'Dev payment failed internally' });
    }
  };
}

module.exports = chargeDevWallet;
