// ====================================================================
// 📂 Full File Path & Name: /src/pages/Login.jsx
// 📌 Purpose: Login page for all users (Dom, Sub, Switch, Admin)
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: None
// 🔄 Related Backend Files: /routes/AuthRoutes.js, /controllers/AuthController.js
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Form submission
// 🔁 Performs: Login, saves token/user to localStorage, redirects
// 🧪 Test Coverage: Manual QA only
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Minimal; async/await on login only

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
// - Logs errors to console: `[Login:handleLogin] Error: [message]`, Payload: [payload]
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
// - Console logs: `[Login DEBUG] [message]`
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

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/utils/api';
import { UserContext } from '@/context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setStatus('Logging in...');

  try {
    const data = await loginUser({ email, password });

    if (!data || !data.token || !data.user) {
      setStatus('❌ Login failed — bad response format');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('actingAs', data.user.role);

    setUser(data.user);
    setStatus('✅ Login successful');

    // ✅ Admin-only redirect
    if (data.user.role === 'Admin') {
      navigate('/admin');
    } else if (data.user.role === 'Dom') {
      navigate('/dashboard/dom');
    } else if (data.user.role === 'Sub') {
      navigate('/dashboard/sub');
    } else if (data.user.role === 'Voyeur') {
      navigate('/profile');
    } else if (data.user.role === 'Switch') {
      navigate('/dashboard/switch');
    } else {
      setStatus('❌ Unknown role — cannot navigate');
    }
  } catch (err) {
    console.error('[Login ERROR]', err);
    setStatus(`❌ ${err?.error || err?.message || 'Invalid credentials'}`);
  }
};

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          name="email"
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          className="w-full border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {status && (
        <p className={`mt-4 ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </div>
  );
}

export default Login;
