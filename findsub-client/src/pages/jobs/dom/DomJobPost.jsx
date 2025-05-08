// ====================================================================
// 📂 Full File Path & Name: src/pages/jobs/dom/DomJobPost.jsx
// 📌 Purpose: Allows a Dom to create and post a new job with kink requirements
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom (enforced via useUser hook)
// 🔄 Related Backend Files: /routes/JobsRoutes.js, /controllers/JobsController.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: on mount (auth check), on kink fetch, on form change, on submit
// 🔁 Performs: fetch kinks, validate auth, submit job post to backend
// 🧪 Test Coverage: Manual testing only; unit tests pending
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Avoids render-blocking; Select component lazy-loads options

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
// 🧰 Behavior Notes:
// - Flexible opt-in props (e.g., noPadding, fullWidth). Defaults enforce consistent layout unless explicitly overridden.
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// - DO NOT EDIT THIS SECTION ======================================

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useUser } from '../../../hooks/useUser';
import { getAllKinks, createJob } from '../../../utils/api';

function DomJobPost() {
  const { user, isDom, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    compensation: '',
    requirements: '',
    category: '',
    expiresAt: '',
    startDate: '',
    startTime: '',
    minDuration: '',
    requiredKinks: []
  });

  const [kinksOptions, setKinksOptions] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isDom)) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, isDom, navigate]);

  useEffect(() => {
    const fetchKinks = async () => {
      try {
        const kinkData = await getAllKinks();
        if (Array.isArray(kinkData)) {
          setKinksOptions(
            kinkData.map(k => ({
              value: k._id,
              label: k.name,
              description: k.description
            }))
          );
        } else {
          console.warn('⚠️ getAllKinks did not return an array:', kinkData);
          setKinksOptions([]);
        }
      } catch (err) {
        console.error('Error fetching kinks:', err);
        setStatus('Error fetching kinks');
        setKinksOptions([]);
      }
    };

    fetchKinks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKinksChange = (selected) => {
    setFormData(prev => ({
      ...prev,
      requiredKinks: selected ? selected.map(s => s.value) : []
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return setStatus('User not logged in.');

    try {
      const payload = { ...formData, posterId: user._id || user.id };
      await createJob(payload);
      setStatus('✅ Job posted successfully.');
      navigate('/jobs');
    } catch (err) {
      console.error('Job post error:', err);
      setStatus(`❌ ${err.message || 'Server error. Please try again.'}`);
    }
  };

  if (isLoading || !user) return <p className="text-center mt-4">Loading job form...</p>;

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      {status && <p className="mb-4">{status}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ['Title', 'title'],
          ['Description', 'description', true],
          ['Location', 'location'],
          ['Compensation', 'compensation'],
          ['Requirements', 'requirements', true],
          ['Expires At', 'expiresAt', false, 'date'],
          ['Start Date', 'startDate', false, 'date'],
          ['Start Time', 'startTime', false, 'time'],
          ['Minimum Duration', 'minDuration']
        ].map(([label, name, isTextarea, type]) => (
          <label key={name} className="block">
            {label}:<br />
            {isTextarea ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border p-2"
              />
            ) : (
              <input
                type={type || 'text'}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border p-2"
              />
            )}
          </label>
        ))}

        <label className="block">
          Category:<br />
          <select
            name="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            required
            className="w-full border p-2"
          >
            <option value="">Select Category</option>
            {[
              'Domestic Servitude',
              'Footwear Cleaning',
              'Worship Sessions',
              'Meal Prep Service',
              'Other'
            ].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label className="block">
          Required Kinks for Job:<br />
        </label>
        <Select
          options={kinksOptions}
          isMulti
          onChange={handleKinksChange}
          placeholder="Search and select required kinks..."
          formatOptionLabel={option => (
            <div>
              <strong>{option.label}</strong>
              {option.description && (
                <div style={{ fontSize: '0.8em', color: '#666' }}>{option.description}</div>
              )}
            </div>
          )}
        />

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Post Job
        </button>
      </form>
    </>
  );
}

export default DomJobPost;
