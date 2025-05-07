// ====================================================================
// 📂 Full File Path & Name: src/layout/HubLayoutWrapper.jsx
// 📌 Purpose: Standardized layout for feature hubs (Jobs, Messages, etc.)
// 🧩 File Type: Layout Component
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Depends on hub parent
// 🔁 useEffect Hooks Used: false
// 🔁 Performs: Sticky tab layout + scrollable content wrapper
// 🧪 Test Coverage: Pending
// 🌐 Environment-Specific Logic: None
// ⚡ Performance Notes: Efficient layout with scroll isolation

import PropTypes from 'prop-types';

function HubLayoutWrapper({ tabs = null, children }) {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]"> {/* assumes header is h-16 */}
      {tabs && (
        <div className="sticky top-16 z-40 bg-[#1e1e1e] border-b border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap gap-2">
            {tabs}
          </div>
        </div>
      )}

      <div className="overflow-y-auto flex-grow">
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">
          {children}
        </div>
      </div>
    </div>
  );
}

HubLayoutWrapper.propTypes = {
  tabs: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default HubLayoutWrapper;
