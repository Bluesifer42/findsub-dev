// ====================================================================
// 📂 Full File Path & Name: src/components/jobs/JobTabs.jsx
// 📌 Purpose: Role-aware tabbed navigation for JobsHub; stays fixed below header
// 🧩 File Type: React Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Dom | Sub
// 🔄 Related Backend Files: None
// 👩‍👦 Is a child component : False/JobsHub
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: N/A
// 🔁 Performs: Tab rendering + route link switching
// 🧪 Test Coverage: Manual QA passed, visual regression tests pending
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Extremely lightweight; re-renders only on route change

// - DO NOT EDIT THIS SECTION ======================================
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
// - DO NOT EDIT THIS SECTION ======================================

import { NavLink } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

function JobTabs() {
  const { isDom, isSub } = useUser();

  const domTabs = [
    { path: '', icon: '📋', label: 'All Jobs' },
    { path: 'listings', icon: '📝', label: 'My Listings' },
    { path: 'applications', icon: '📬', label: 'Applications' },
    { path: 'active', icon: '📌', label: 'Active Jobs' },
    { path: 'history', icon: '📉', label: 'Job History' },
    { path: 'post', icon: '➕', label: 'Post New Job' },
  ];

  const subTabs = [
    { path: '', icon: '📋', label: 'All Jobs' },
    { path: 'sub-applications', icon: '📬', label: 'Applications' },
    { path: 'sub-active', icon: '📌', label: 'Active Jobs' },
    { path: 'sub-history', icon: '📉', label: 'Job History' },
  ];

  const tabs = isDom ? domTabs : isSub ? subTabs : [];

  return (
    <div className="sticky top-[50px] z-40 bg-[#1e1e1e] border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={`/jobs/${tab.path}`}
            end={tab.path === ''}
            className={({ isActive }) =>
              `px-3 py-1 rounded text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`
            }
          >
            {tab.icon} {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default JobTabs;
