// ====================================================================
// 📂 Full File Path & Name: /src/layout/Footer.jsx
// 📌 Purpose: Sticky site-wide footer with status info, persistent at the bottom
// 🧩 File Type: Shared Component
// 🔐 Requires Authenticated User: false
// 🔐 Role Restricted: Any (handled by parent layout if needed)
// 🔄 Related Backend Files: None
// 🔁 useEffect Hooks Used: false
// 🔁 Triggers: None
// 🔁 Performs: Static footer rendering
// 🧪 Test Coverage: Pending unit test coverage
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Lightweight static render-only component

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
// 🔁 API Integration:
// - All calls made via centralized api.js
// - Raw data returned, transformed only in consuming component
//
// 🧰 Behavior Notes: Flexible opt-in props (e.g., noPadding, fullWidth). Defaults enforce consistent layout unless explicitly overridden.
//
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// - DO NOT EDIT THIS SECTION ======================================

import React from 'react';

function Footer() {
  return (
    <footer className="sticky bottom-0 w-full z-30 bg-gray-800 text-white text-center py-2 border-t border-gray-700 shadow-md text-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span>&copy; 2025 FindSub</span>
        <span className="opacity-70">System Stable · Account Status: OK</span>
      </div>
    </footer>
  );
}

export default Footer;