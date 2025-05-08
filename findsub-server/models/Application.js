// ====================================================================
// 📂 Full File Path & Name: /models/Application.js
// 📌 Purpose: Define schema for job applications submitted by Subs
// 🧩 File Type: Mongoose Model
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Sub (enforced via backend controller)
// 🔄 Related Backend Files: /routes/ApplicationRoutes.js, /controllers/ApplicationController.js
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: N/A (used by controller only)
// 🔁 Performs: Creates, indexes, and stores application data in MongoDB
// 🧪 Test Coverage: Validation via Mongoose schema; Integration tested via Postman
// 🌐 Environment-Specific Logic: Logs on dev only
// ⚡ Performance Notes: Indexed fields for job_id and applicant_id

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
// - React Router <Link> for internal routing
// - Direct route changes use navigate('/path')
// - Job views: In-tab detail loading in JobsHub via selectedJobId state (mobile uses embedded view)
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
// - Sanitizes inputs via `sanitize-html`
// - Prevents XSS via Helmet middleware
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// - DO NOT EDIT THIS SECTION ======================================

const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
    index: true
  },
  applicant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  cover_letter: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // auto-adds createdAt and updatedAt
});

// Remove `created_at` from the schema (now handled by timestamps)
// Ensure clean and consistent fields: job_id, applicant_id, cover_letter, createdAt, updatedAt

module.exports = mongoose.model('Application', applicationSchema);
