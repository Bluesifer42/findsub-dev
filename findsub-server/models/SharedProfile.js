// ====================================================================
// 📂 Full File Path & Name: /models/SharedProfile.js
// 📌 Purpose: Defines a shared identity profile for linked Dom/Sub accounts representing a unified user identity across both roles
// 🧩 File Type: Mongoose Model
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch | Any (enforced via `restrictToRole` middleware)
// 🔄 Related Backend Files: /routes/UserRoutes.js, /controllers/UserController.js
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: N/A (used via User linkage)
// 🔁 Performs: Unifies identity, tracks roles, exposes reputation & gallery
// 🧪 Test Coverage: Integration tested via user linking, profile access
// 🌐 Environment-Specific Logic: Uses `process.env.NODE_ENV` for logging/debug
// ⚡ Performance Notes: Indexed by display_name, used for public lookups

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

const SharedProfileSchema = new Schema({
  display_name: { type: String, required: true, unique: true, trim: true },
  avatar_url: { type: String, default: '' },
  bio: { type: String, default: '' },

  roles_available: {
    type: [String],
    enum: ['dom', 'sub'],
    required: true,
    default: []
  },

archived_roles: [{
  role: { type: String, enum: ['dom', 'sub'], required: true },
  archived_at: { type: Date, default: Date.now },
  reason: { type: String, default: '' }
}],

  reputation: {
    dom: { type: Number, default: 0 },
    sub: { type: Number, default: 0 }
  },

  gallery: [{
    url: { type: String },
    caption: { type: String, default: '' },
    uploadedAt: { type: Date, default: Date.now }
  }],

  role_locks: {
  dom: { type: Boolean, default: false },
  sub: { type: Boolean, default: false }
},

  is_flagged: { type: Boolean, default: false },
  flag_reason: { type: String, default: '' },
  badge_tier: { type: Number, default: 0 },

  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SharedProfile', SharedProfileSchema);
