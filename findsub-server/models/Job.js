// ====================================================================
// 📂 Full File Path & Name: /models/Job.js
// 📌 Purpose: Defines the schema for posted jobs, including metadata, fulfillment, and poster role context
// 🧩 File Type: Mongoose Model
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Switch (posting must be done while acting as Dom)
// 🔄 Related Backend Files: /routes/JobRoutes.js, /controllers/JobController.js
// 👩‍👦  Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Form submission via job posting interface
// 🔁 Performs: Stores job listing, poster role, applicant list, and fulfillment data
// 🧪 Test Coverage: Covered in job post flow and fulfillment lifecycle
// 🌐 Environment-Specific Logic: Development logging during job post creation
// ⚡ Performance Notes: Indexed on `posterId`, `status`, `expiresAt` for board rendering

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

const JobSchema = new mongoose.Schema({
  // 📌 Job poster and role
  posterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  acting_as: {
    type: String,
    enum: ['dom'],
    required: true,
    default: 'dom'
  },

  // 📋 Job Details
  title: { type: String },
  description: { type: String },
  location: { type: String },
  compensation: { type: String },
  requirements: { type: String },
  category: { type: String },

  // 🎯 Required Kinks (references Kink model)
  requiredKinks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kink'
  }],

  // 🕒 Timing Details
  startDate: { type: Date },
  startTime: { type: String },
  minDuration: { type: String },
  expiresAt: { type: Date },

  // 🧑‍🤝‍🧑 Applicants
  applicants: [
    {
      applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      coverLetter: { type: String },
      appliedAt: { type: Date, default: Date.now }
    }
  ],

  // 🏁 Fulfillment Fields
  selectedApplicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isFilled: {
    type: Boolean,
    default: false
  },
  fulfilledOn: { type: Date },
  completedOn: { type: Date },
  status: {
    type: String,
    enum: ['open', 'filled', 'completed', 'failed', 'cancelled'],
    default: 'open'
  },

  // ✏️ Editable flag for Doms (can relist or cancel jobs)
  isEditable: {
    type: Boolean,
    default: true
  },

  // 📝 Feedback Tracking Flags
  subFeedbackLeft: {
    type: Boolean,
    default: false
  },
  domFeedbackLeft: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);
