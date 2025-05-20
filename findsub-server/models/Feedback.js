// ====================================================================
// 📂 Full File Path & Name: /models/Feedback.js
// 📌 Purpose: Stores job-related feedback between users, tagging roles (Dom/Sub) on both sides of the interaction
// 🧩 File Type: Mongoose Model
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch (enforced via controller logic)
// 🔄 Related Backend Files: /routes/FeedbackRoutes.js, /controllers/FeedbackController.js
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Submitted after job completion
// 🔁 Performs: Saves user feedback, ratings, and optional badge gifting
// 🧪 Test Coverage: Unit tested; Integration covered in job lifecycle test suite
// 🌐 Environment-Specific Logic: Dev-only logging for debug and audit
// ⚡ Performance Notes: Indexed by `jobId`, optimized for reverse user lookups

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

const FeedbackSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  from_role: {
    type: String,
    enum: ['dom', 'sub'],
    required: true
  },
  to_role: {
    type: String,
    enum: ['dom', 'sub'],
    required: true
  },

  generalRatings: {
    type: Map,
    of: {
      type: Number,
      min: 0,
      max: 5
    },
    required: true
  },

  interestRatings: { 
    type: Map,
    of: Number,
    default: {}
  },

  badgeGifting: {
    type: Map,
    of: Number,
    default: {}
  },

  honestyScore: { type: Number, min: 0, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  isFlagged: { type: Boolean, default: false },
  flagReason: { type: String, default: '' }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
