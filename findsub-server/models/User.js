// ====================================================================
// 📂 Full File Path & Name: /models/User.js
// 📌 Purpose: Stores user account data for Dom, Sub, Switch, Voyeur, and Admin roles; links shared or admin profile
// 🧩 File Type: Mongoose Model
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch | Admin | Voyeur
// 🔄 Related Backend Files: /routes/AuthRoutes.js, /controllers/UserController.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Signup, role upgrade, subscription change
// 🔁 Performs: Stores secure credentials, role flags, reputation, and profile links
// 🧪 Test Coverage: Covered by auth tests; integration planned for role upgrade logic
// 🌐 Environment-Specific Logic: Dev logging for trust recalculation and validations
// ⚡ Performance Notes: Indexed by username/email; trustScore recalculated on demand

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================
//
// 📦 Data Shape:
// - Incoming API payloads: camelCase
// - MongoDB schema fields: snake_case
// - Internal React state/props/vars: camelCase
// - Kink references: ObjectId for DB queries; { _id, name, description } for UI display
// - Admins may include: isOwner: Boolean, permissions: [String]
// - Admins use adminProfileId (planned)
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
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ['Dom', 'Sub', 'Switch', 'Admin', 'Voyeur'],
    required: true
  },

  isOwner: { type: Boolean, default: false }, // ✅ Owner protection flag

  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: { type: Date, required: true },
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },

  testAccount: { type: Boolean, default: false },

  kinks: [{
    kink: { type: mongoose.Schema.Types.ObjectId, ref: 'Kink' },
    rating: {
      type: String,
      enum: ['Hard Limit', 'Limit', 'Like it', 'Love it', 'Live for it'],
      default: 'Like it'
    }
  }],
  kinkHistory: [{
    kink: { type: mongoose.Schema.Types.ObjectId, ref: 'Kink' },
    rating: {
      type: String,
      enum: ['Hard Limit', 'Limit', 'Like it', 'Love it', 'Live for it'],
      default: 'Like it'
    }
  }],
  limits: { type: String, default: '' },

  phoneNumber: { type: String, default: '' },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },

  bio: { type: String, default: '' },
  verified: { type: Boolean, default: false },

  reputationScore: { type: Number, default: 0 },
  trustScore: { type: Number, default: 0 },
  profileCompletion: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 },
  averageHonestyScore: { type: Number, default: 0 },
  isAddressVerified: { type: Boolean, default: false },

  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
  badgeTier: { type: Number, default: 0 },

  sharedProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SharedProfile',
    required: true
  },

  adminProfileId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'AdminProfile',
  required: function () {
    return this.role === 'Admin';
  }
},

  linkedAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  subscription: {
    basePlan: {
      type: String,
      enum: ['dom', 'sub', 'switch', 'voyeur'],
      required: true
    },
    isSwitchUnlocked: { type: Boolean, default: false },
    billingStatus: {
      type: String,
      enum: ['active', 'cancelled', 'grace', 'free'],
      default: 'active'
    },
    renewalDate: { type: Date, default: null }
  },

  status: {
    type: String,
    enum: ['active', 'archived', 'banned'],
    default: 'active'
  },

  createdAt: { type: Date, default: Date.now }
});

// ✅ Trust Score Logic
UserSchema.methods.recalculateTrustScore = function () {
  let baseProfileScore = 0;
  if (this.emailVerified && this.phoneVerified && this.isAddressVerified && this.bio && this.kinks.length > 0) {
    baseProfileScore = 100;
  }
  const jobPoints = this.completedJobs * 5;
  const honestyBonus = (this.averageHonestyScore || 0) * 2;

  this.trustScore = baseProfileScore + jobPoints + honestyBonus;
  return this.trustScore;
};

module.exports = mongoose.model('User', UserSchema);
