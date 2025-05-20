// ====================================================================
// 📂 Full File Path & Name: src/utils/api.js
// 📌 Purpose: Centralized API request manager for all frontend components
// 🧩 File Type: Shared Utility Module
// 🔐 Requires Authenticated User: varies per method
// 🛠 Used By: All components that interact with backend via Axios
// 🧪 Testing Notes: Handles all route calls, logs all errors with context
// 💡 Casing Conventions:
// - camelCase for functions & variables
// - PascalCase for component names (not used here)
// - snake_case for MongoDB field names
// 🌐 Route Structure: RESTful
// 🔍 Error Handling: All calls are wrapped with try/catch + centralized logger
// 📦 External Libs: Axios
// ❗IMPORTANT: All methods must return raw data, not response wrappers
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

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const request = async ({ url, method = 'GET', data = null, params = null }) => {
  try {
    const token = localStorage.getItem('token');
    const actingAs = localStorage.getItem('actingAs');

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(actingAs && { 'x-acting-as': actingAs }),
    };

    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Unknown API error' };
  }
};

// 🔐 AUTH
export const loginUser = (data) => request({ url: '/api/auth/login', method: 'POST', data });
export const verifyToken = () => request({ url: '/api/auth/me', method: 'GET' });
export const registerUser = (data) => request({ url: '/api/auth/register', method: 'POST', data });

// 👥 USERS
export const getUserProfile = (id) => request({ url: `/api/users/${id}`, method: 'GET' });
export const updateUserProfile = (id, data) => request({ url: `/api/users/${id}`, method: 'PUT', data });
export const getSharedProfileByDisplayName = (displayName) =>
  request({ url: `/api/users/public-profile/${displayName}`, method: 'GET' });

// 🛠 ADMIN
export const getSignupAttempts = () => request({ url: '/api/admin/signup-attempts', method: 'GET' });
export const getUsers = () => request({ url: '/api/admin/users', method: 'GET' });
export const deleteUserById = (userId) =>
  request({ url: `/api/admin/users/${userId}`, method: 'DELETE' });

// 🧪 DEV TOOLS
export const createTestUser = (data) => request({ url: '/api/devtools/create-user', method: 'POST', data });
export const createTestJob = (data) => request({ url: '/api/devtools/create-job', method: 'POST', data });
export const createTestApplication = (data) => request({ url: '/api/devtools/create-application', method: 'POST', data });
export const purgeType = (type) => request({ url: `/api/devtools/purge/${type}`, method: 'DELETE' });

// 📋 JOBS
export const getAllJobs = () => request({ url: '/api/jobs', method: 'GET' });
export const getJobById = (id) => request({ url: `/api/jobs/${id}`, method: 'GET' });
export const postNewJob = (data) => request({ url: '/api/jobs', method: 'POST', data });

// 📨 APPLICATIONS
export const applyToJob = (data) => request({ url: '/api/applications', method: 'POST', data });
export const getApplicationsByUser = (userId) => request({ url: `/api/applications/user/${userId}`, method: 'GET' });
export const getApplicationsByJob = (jobId) => request({ url: `/api/applications/${jobId}`, method: 'GET' });

// ⭐ FEEDBACK
export const leaveFeedback = (data) => request({ url: '/api/feedback', method: 'POST', data });
export const getFeedbackForUser = (userId) => request({ url: `/api/feedback/user/${userId}`, method: 'GET' });

// 🧠 KINKS
export const getKinks = () => request({ url: '/api/kinks', method: 'GET' });
export const addKink = (data) => request({ url: '/api/kinks/create', method: 'POST', data });
export const updateKink = (id, data) => request({ url: `/api/kinks/${id}`, method: 'PUT', data });
export const deleteKink = (id) => request({ url: `/api/kinks/${id}`, method: 'DELETE' });

export default request;
