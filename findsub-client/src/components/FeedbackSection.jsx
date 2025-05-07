// ====================================================================
// 📂 Full File Path & Name: /components/FeedbackSection.jsx
// 📌 Purpose: Displays feedback history for a given user, fetched from backend.
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (enforced via API logic, not this component)
// 🔄 Related Backend Files: /routes/FeedbackRoutes.js, /controllers/FeedbackController.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: userId prop change
// 🔁 Performs: Fetches and displays user feedback entries
// 🧪 Test Coverage: Not yet covered; should be added to __tests__/FeedbackSection.test.js
// 🌐 Environment-Specific Logic: Dev-only logging on fetch errors
// ⚡ Performance Notes: No memoization; assumes minimal feedback volume

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

import { useEffect, useState } from 'react';

function FeedbackSection({ userId }) {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/feedback/user/${userId}`)
      .then(res => res.json())
      .then(data => setFeedback(data.feedback || []))
      .catch(err => console.error('Feedback fetch error:', err));
  }, [userId]);

  if (feedback.length === 0) return <p>No feedback available.</p>;

  return (
    <div>
      <h3 className="font-semibold mb-2">Your Feedback</h3>
      {feedback.map((f) => (
        <div key={f._id} className="border p-2 mb-3">
          <p><strong>From:</strong> {f.fromUser.username} ({f.fromUser.role})</p>
          {f.generalRatings && (
            <>
              <p className="mt-1"><strong>General Ratings:</strong></p>
              <ul>
                {Object.entries(f.generalRatings).map(([key, val]) => (
                  <li key={key}>{key}: {val} / 5</li>
                ))}
              </ul>
            </>
          )}
          {f.honestyScore !== undefined && (
            <p><strong>Honesty Score:</strong> {f.honestyScore} / 5</p>
          )}
          {f.comment && <p><strong>Comment:</strong> {f.comment}</p>}
        </div>
      ))}
    </div>
  );
}

export default FeedbackSection;
