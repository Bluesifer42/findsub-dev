// ====================================================================
// 📂 Full File Path & Name: /src/layout/LayoutWrapper.jsx
// 📌 Purpose: Wraps each page in a consistent responsive layout, handles spacing, width, and theme classes.
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: false (neutral layout shell)
// 🔐 Role Restricted: None
// 🔄 Related Backend Files: None
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: Prop changes
// 🔁 Performs: Wraps page in margin/padding/styling layout, controlled by props
// 🧪 Test Coverage: Manual QA; no unit test written
// 🌐 Environment-Specific Logic: none
// ⚡ Performance Notes: lightweight, memoization not required

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
// - Section layouts (e.g., JobsHub) use <Outlet /> to render tab-aware nested views
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

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function LayoutWrapper({
  children,
  noPadding = false,
  fullWidth = false,
  noTopSpace = false,
  noBottomSpace = false
}) {
  const wrapperClass = classNames(
    'mx-auto',
    {
      'max-w-screen-xl': !fullWidth,
      'px-4 sm:px-6 lg:px-8': !noPadding,
      'pt-4 sm:pt-6 lg:pt-8': !noTopSpace,
      'pb-4 sm:pb-6 lg:pb-8': !noBottomSpace,
    }
  );

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col flex-grow">
      <div className={wrapperClass}>
        {children}
      </div>
    </div>
  );  
}

LayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  noPadding: PropTypes.bool,
  fullWidth: PropTypes.bool,
  noTopSpace: PropTypes.bool,
  noBottomSpace: PropTypes.bool,
};

export default LayoutWrapper;
