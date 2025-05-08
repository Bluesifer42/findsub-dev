// ====================================================================
// 📂 Full File Path & Name: src/pages/jobs/DomJobFeedbackFields.jsx
// 📌 Purpose: Render a dynamic set of feedback inputs for Doms to rate subs after job completion.
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom
// 🔄 Related Backend Files: /routes/FeedbackRoutes.js, /controllers/FeedbackController.js
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: input value change on feedback form
// 🔁 Performs: Sets local rating/badge state to submit via parent
// 🧪 Test Coverage: No formal unit tests yet; manually verified
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Stateless inputs; rerenders only on prop change

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

function DomFeedbackFields({ setGeneralRatings, setInterestRatings, setBadgeGifting, requiredKinks }) {
  const handleRatingChange = (field, value, setter) => {
    setter(prev => ({ ...prev, [field]: Number(value) }));
  };

  const kinkKey = (kink) => (typeof kink === 'string' ? kink : kink._id || '');
  const kinkName = (kink) => (typeof kink === 'string' ? kink : kink.name || 'Unknown Kink');

  const handleBadgeChange = (key, value) => {
    setBadgeGifting(prev => {
      const updated = { ...prev };
      if (!value || isNaN(value)) {
        delete updated[key];
      } else {
        const num = Number(value);
        if (num >= 1 && num <= 3) updated[key] = num;
        else delete updated[key];
      }
      return updated;
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">General Performance Ratings</h3>
      {[
        'Obedience',
        'Punctuality',
        'Cleanliness',
        'Respectfulness',
        'Work Ethic',
        'Attention to Detail'
      ].map(label => (
        <div key={label} className="mb-2">
          <label className="block mb-1">{label}:</label>
          <input
            type="number"
            min={1}
            max={5}
            onChange={e => handleRatingChange(label, e.target.value, setGeneralRatings)}
            required
            className="border px-2 py-1 w-20"
          />
        </div>
      ))}

      <h3 className="text-lg font-semibold mt-6 mb-2">Kink-Based Feedback</h3>
      {requiredKinks && requiredKinks.length > 0 ? (
        requiredKinks.map(kink => {
          const key = kinkKey(kink);
          const name = kinkName(kink);
          return (
            <div key={key} className="border p-4 mb-4 rounded">
              <label className="block mb-1">{name} Performance (1–5):</label>
              <input
                type="number"
                min={1}
                max={5}
                required
                onChange={e => handleRatingChange(key, e.target.value, setInterestRatings)}
                className="border px-2 py-1 w-20"
              />

              <label className="block mt-2 mb-1">{name} Badge (optional, 1–3):</label>
              <input
                type="number"
                min={1}
                max={3}
                placeholder="Leave blank to skip"
                onChange={e => handleBadgeChange(key, e.target.value)}
                className="border px-2 py-1 w-20"
              />
            </div>
          );
        })
      ) : (
        <p>No required kinks listed for this job.</p>
      )}
    </div>
  );
}

export default DomFeedbackFields;
