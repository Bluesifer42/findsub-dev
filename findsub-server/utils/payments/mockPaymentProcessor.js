// ====================================================================
// 📂 Full File Path & Name: /src/utils/payments/mockPaymentProcessor.js
// 📌 Purpose: Dev-only mock payment processor to simulate charges during testing
// 🧩 File Type: Utility
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (enforced at route/controller level)
// 🔄 Related Backend Files: All routes that handle onboarding or upgrade charges
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Called by backend routes simulating payment-based access
// 🔁 Performs: Deducts from `devWallet.balance` and returns a simulated charge result
// 🧪 Test Coverage: Manually tested in dev flows; Stripe not used here
// 🌐 Environment-Specific Logic: Only loaded if `NODE_ENV !== 'production'`
// ⚡ Performance Notes: Lightweight in-memory operation, no external calls

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

async function charge(user, amount, reason = 'Generic Test Charge') {
  if (!user || !user.devWallet) {
    return { success: false, message: '[DEV] Wallet missing or user not valid' };
  }

  // ✅ Test accounts always pass
  if (user.testAccount === true) {
    console.log(`[DEV PAYMENT] [TEST ACCOUNT] Simulated £${amount} for ${reason}`);
    return {
      success: true,
      message: `[TEST ACCOUNT] Simulated £${amount} for ${reason}`,
      remainingBalance: user.devWallet.balance
    };
  }

  // 🧮 Real dev wallet charge
  if (user.devWallet.balance >= amount) {
    user.devWallet.balance -= amount;
    user.markModified('devWallet');
    await user.save();

    console.log(`[DEV PAYMENT] Charged £${amount} from ${user.username} for ${reason}`);
    return {
      success: true,
      message: `[DEV] £${amount} deducted for ${reason}`,
      remainingBalance: user.devWallet.balance
    };
  } else {
    return {
      success: false,
      message: `[DEV] Insufficient balance for ${reason} — user has £${user.devWallet.balance}`
    };
  }
}

module.exports = { charge };
