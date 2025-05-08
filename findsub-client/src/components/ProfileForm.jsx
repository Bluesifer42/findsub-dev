// ====================================================================
// 📂 Full File Path & Name: /components/ProfileForm.jsx
// 📌 Purpose: Renders the editable profile form for updating user fields and triggering email/phone verification
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (enforced via `restrictToRole` middleware elsewhere)
// 🔄 Related Backend Files: /routes/UsersRoutes.js, /controllers/UsersController.js
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Input changes, Save button, Verify email/phone
// 🔁 Performs: onChange updates, submits profile data, sends verification requests
// 🧪 Test Coverage: Manual tested; unit tests pending in __tests__/ProfileForm.test.js
// 🌐 Environment-Specific Logic: Dev logging only on parent component
// ⚡ Performance Notes: Stateless form; no expensive renders
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

function ProfileForm({ user, onChange, onSave, onVerifyEmail, onVerifyPhone, status }) {
    return (
      <form onSubmit={onSave} className="space-y-4">
        <div>
          <label>Username</label>
          <input name="username" value={user.username || ''} onChange={onChange} className="w-full border p-2" />
        </div>
  
        <div>
          <label>Email</label>
          <input name="email" value={user.email || ''} onChange={onChange} className="w-full border p-2" />
          {user.emailVerified ? ' ✅' : ' ❌'}
          {!user.emailVerified && <button type="button" onClick={onVerifyEmail}>Verify Email</button>}
        </div>
  
        <div>
          <label>Phone Number</label>
          <input name="phoneNumber" value={user.phoneNumber || ''} onChange={onChange} className="w-full border p-2" />
          {user.phoneVerified ? ' ✅' : ' ❌'}
          {!user.phoneVerified && <button type="button" onClick={onVerifyPhone}>Verify Phone</button>}
        </div>
  
        <div>
          <label>Experience Level</label>
          <select name="experienceLevel" value={user.experienceLevel || 'Beginner'} onChange={onChange} className="w-full border p-2">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
  
        <div>
          <label>Limits</label>
          <textarea name="limits" value={user.limits || ''} onChange={onChange} className="w-full border p-2" />
        </div>
  
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Save Changes</button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </form>
    );
  }
  
  export default ProfileForm;
  