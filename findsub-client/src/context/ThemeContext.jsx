// ====================================================================
// 📂 Full File Path & Name: /src/context/ThemeContext.jsx
// 📌 Purpose: Provides global theming support, user-specific persistence, seasonal overrides
// 🧩 File Type: Context Provider
// 🔐 Requires Authenticated User: false (theme applied pre-login)
// 🔐 Role Restricted: No, but admins can also use this context
// 🔄 Related Backend Files: None (localStorage persistence only)
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: App load, theme change, seasonal override logic
// 🔁 Performs: Injects data-theme to <html>, persists preference
// 🧪 Test Coverage: Manual only; seasonal override unit tests TBD
// 🌐 Environment-Specific Logic: Uses Date for seasonal triggers
// ⚡ Performance Notes: Minimal DOM update; throttled via setState

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
// - Use <Link> for static in-app navigation (e.g., navbars, sidebars)
// - Use navigate('/path') for dynamic redirection (e.g., after logout or submit)
// - Use <Outlet /> inside wrapper layouts (e.g., JobsHub) to render nested child routes contextually
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
// ♿ Accessibility:
// - Follows WCAG 2.1; uses ARIA labels for UI components
//
// - DO NOT EDIT THIS SECTION ======================================

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const SEASONAL_THEMES = {
  '12-01': 'christmas',
  '02-14': 'valentines',
  '10-31': 'halloween',
};

const getSeasonalTheme = () => {
  const today = new Date();
  const key = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return SEASONAL_THEMES[key] || null;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');
  const [manualOverride, setManualOverride] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const override = localStorage.getItem('manualThemeOverride') === 'true';
    const seasonal = getSeasonalTheme();

    if (savedTheme) setTheme(savedTheme);
    if (override) setManualOverride(true);
    else if (seasonal) setTheme(seasonal);
  }, []);

  // Apply to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Change theme manually
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('manualThemeOverride', 'true');
    setManualOverride(true);
  };

  // Reset to seasonal (or default)
  const resetTheme = () => {
    const seasonal = getSeasonalTheme();
    const fallback = 'default';
    const newTheme = seasonal || fallback;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('manualThemeOverride', 'false');
    setManualOverride(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme, resetTheme, manualOverride }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
