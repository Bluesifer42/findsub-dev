// ====================================================================
// 📂 Full File Path & Name: src/components/FeedbackTabs.jsx
// 📌 Purpose: Display role-filtered feedback tabs ("As Dom", "As Sub")
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub | Switch
// 🔄 Related Backend Files: /api/feedback/user/:userId
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: Tab switch or userId change
// 🧪 Test Coverage: Visual toggle and role-specific fetch
// 🌐 Environment-Specific Logic: Dev-only stub feedback accepted
// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================

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
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

import { useEffect, useState } from 'react';
import { useRole } from '../context/RoleContext';

function FeedbackTabs({ userId }) {
  const [tab, setTab] = useState('dom');
  const [feedback, setFeedback] = useState([]);
  const { actingAs } = useRole();

  useEffect(() => {
    fetchFeedback(tab);
  }, [tab, userId]);

  const fetchFeedback = async (role) => {
    try {
      const res = await fetch(`http://localhost:5000/api/feedback/user/${userId}?role=${role}`);
      const data = await res.json();
      setFeedback(data.feedback || []);
    } catch (err) {
      console.error('Feedback load error:', err);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('dom')}
          className={`px-3 py-1 rounded ${tab === 'dom' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          As Dom
        </button>
        <button
          onClick={() => setTab('sub')}
          className={`px-3 py-1 rounded ${tab === 'sub' ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}
        >
          As Sub
        </button>
      </div>

      {feedback.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No feedback for this role yet.</p>
      ) : (
        <ul className="space-y-2">
          {feedback.map((f, i) => (
            <li key={i} className="border rounded p-3">
              <p className="italic text-gray-700">"{f.comment || 'No comment'}"</p>
              <p className="text-sm text-gray-600 mt-1">From: {f.fromUser?.username || 'Unknown'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackTabs;
