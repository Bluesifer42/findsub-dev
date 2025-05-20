// ====================================================================
// 📂 Full File Path & Name: /src/pages/Dashboard.jsx
// 📌 Purpose: Redirect users to their appropriate role-based dashboard
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true
// 🔐 Role Restricted: Any (redirects based on user.role)
// 🔄 Related Backend Files: N/A (frontend-only logic)
// 👩‍👦 Is a child component : False
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: Auth state load
// 🔁 Performs: redirect to proper dashboard path based on role
// 🧪 Test Coverage: Manual test only
// 🌐 Environment-Specific Logic: Dev-only logs
// ⚡ Performance Notes: Lightweight route logic

// - DO NOT EDIT OR REMOVE THE SECTION BELOW THIS LINE ======================================
//
// 📦 Data Shape:
// - Incoming API payloads: camelCase
// - MongoDB schema fields: snake_case
// - Internal React state/props/vars: camelCase
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
// - Uses toast for user-visible errors
// - Logs errors to console
//
// 📍 Navigation Standards:
// - Use navigate() for logic-based redirection
//
// 🧰 Behavior Notes:
// - Renders a loading message until redirect completes
//
// ♿ Accessibility:
// - Returns a paragraph fallback if redirect is interrupted
//
// - DO NOT EDIT OR REMOVE THE SECTION ABOVE THIS LINE ======================================

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

function Dashboard() {
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/login');
    } else if (user?.role === 'Admin') {
      navigate('/admin');
    } else if (user?.role === 'Dom') {
      navigate('/dashboard/dom');
    } else if (user?.role === 'Sub') {
      navigate('/dashboard/sub');
    } else if (user?.role === 'Switch') {
      navigate('/dashboard/switch');
    } else {
      navigate('/login'); // fallback
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  return <p className="text-center mt-4">Redirecting to your dashboard...</p>;
}

export default Dashboard;
