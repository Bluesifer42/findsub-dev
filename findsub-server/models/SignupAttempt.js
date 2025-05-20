// ====================================================================
// 📂 Full File Path & Name: /models/SignupAttempt.js
// 📌 Purpose: Tracks all manual registration attempts for admin visibility and fraud detection
// 🧩 File Type: Mongoose Model
// 🔐 Requires Authenticated User: false (logs public registration attempts)
// 🔐 Role Restricted: Any (based on input only)
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: POST /register/dom or /register/sub
// 🔁 Performs: Logs attempt email, role, headers, and IP address
// 🧪 Test Coverage: Log only — verified by database entries
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Low write volume, used only on signup attempts

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

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SignupAttemptSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  attempted_role: {
    type: String,
    enum: ['Dom', 'Sub'],
    required: true
  },
  ip: {
    type: String,
    default: 'unknown'
  },
  user_agent: {
    type: String,
    default: 'unknown'
  },
  success: {
    type: Boolean,
    default: false
  },
  error_message: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SignupAttempt', SignupAttemptSchema);
