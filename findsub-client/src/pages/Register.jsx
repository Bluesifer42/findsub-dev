// ====================================================================
// 📂 Full File Path & Name: /src/pages/Register.jsx
// 📌 Purpose: User registration form that aligns with backend schema
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any (Dom, Sub, Voyeur)
// 🔄 Related Backend Files: /controllers/AuthController.js
// 👩‍👦 Is a child component : false
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: onSubmit
// 🔁 Performs: Registration and initial login
// 🧪 Test Coverage: Manual testing, signup flow
// 🌐 Environment-Specific Logic: uses localStorage
// ⚡ Performance Notes: Form-only, no heavy hooks

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================
//
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
// 📘 Helper Output Format:
// - Returns booleans only (no state mutation)
// - Intended for use in UI guards, role toggles, and layout gating
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';

function Register() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    role: 'Sub',
    gender: 'female',
    dateOfBirth: '',
    experienceLevel: 'Beginner',
    phoneNumber: '',
  });

  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const { user, token } = await registerUser(form);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setStatus('✅ Registered! Redirecting...');
      setTimeout(() => {
        if (user.role === 'Dom') navigate('/dashboard/dom');
        else if (user.role === 'Sub') navigate('/dashboard/sub');
        else if (user.role === 'Voyeur') navigate('/profile');
        else navigate('/profile');

      }, 1000);
    } catch (err) {
      console.error('[Register Error]', err);
      setStatus(`❌ ${err.error || 'Registration failed'}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" placeholder="Email" type="email" required onChange={handleChange} className="w-full border p-2" />
        <input name="username" placeholder="Username" required onChange={handleChange} className="w-full border p-2" />
        <input name="password" placeholder="Password" type="password" required onChange={handleChange} className="w-full border p-2" />

        <select name="role" value={form.role} onChange={handleChange} className="w-full border p-2">
          <option value="Sub">Sub</option>
          <option value="Dom">Dom</option>
          <option value="Voyeur">Voyeur</option>
        </select>

        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border p-2">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="non-binary">Non-binary</option>
          <option value="other">Other</option>
        </select>

        <input name="dateOfBirth" type="date" required onChange={handleChange} className="w-full border p-2" />
        <input name="phoneNumber" placeholder="Phone Number" required onChange={handleChange} className="w-full border p-2" />

        <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className="w-full border p-2">
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Experienced">Experienced</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white p-2">Register</button>
      </form>

      {status && (
        <p className={`mt-4 ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{status}</p>
      )}
    </div>
  );
}

export default Register;
