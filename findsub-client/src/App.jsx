// ====================================================================
// 📂 Full File Path & Name: src/App.jsx
// 📌 Purpose: Core application wrapper, provides global routing, context, and layout with right-side overlay sidebar
// 🧩 File Type: React Page
// 🔐 Requires Authenticated User: true (for most routes)
// 🔐 Role Restricted: Dom | Sub | Switch | Any (enforced via `restrictToRole` middleware)
// 🔄 Related Backend Files: /routes/UserRoutes.js, /routes/JobsRoutes.js
// 🔁 useEffect Hooks Used: true
// 🔁 Triggers: route change, user context load
// 🔁 Performs: dynamic routing, layout selection, auth-protected rendering
// 🧪 Test Coverage: Partial manual QA; core routes tested in staging
// 🌐 Environment-Specific Logic: Uses `process.env.NODE_ENV` to differentiate dev/prod behavior
// ⚡ Performance Notes: Memoized context and layout reuse across route changes

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

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserProvider } from './context/UserContext';
import { useAuth } from './context/useAuth';

import LayoutWrapper from './layout/LayoutWrapper';
import Header from './layout/Header';
import Footer from './layout/Footer';

// 🔁 Lazy-loaded Pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Messages = lazy(() => import('./pages/Messages'));
const Profile = lazy(() => import('./pages/Profile'));
const PublicProfile = lazy(() => import('./pages/PublicProfile'));
const UserDirectory = lazy(() => import('./pages/UserDirectory'));
const JobsHub = lazy(() => import('./pages/features/JobsHub'));
const PublicJobsBoard = lazy(() => import('./pages/jobs/PublicJobsBoard'));
const DomJobListings = lazy(() => import('./pages/jobs/dom/DomJobListings'));
const DomJobPost = lazy(() => import('./pages/jobs/dom/DomJobPost'));
const DomApplicationsList = lazy(() => import('./pages/jobs/dom/DomApplicationsList'));
const DomActiveJobs = lazy(() => import('./pages/jobs/dom/DomActiveJobs'));
const DomJobHistory = lazy(() => import('./pages/jobs/dom/DomJobHistory'));
const SubApplicationsList = lazy(() => import('./pages/jobs/sub/SubApplicationsList'));
const SubAcceptedJobs = lazy(() => import('./pages/jobs/sub/SubAcceptedJobs'));
const SubJobHistory = lazy(() => import('./pages/jobs/sub/SubJobHistory'));
const JobDetail = lazy(() => import('./pages/jobs/JobDetail'));
const FeedbackForm = lazy(() => import('./pages/jobs/JobFeedbackForm'));

// 🔧 Lazy Admin Pages
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminJobs = lazy(() => import('./pages/AdminJobs'));
const AdminFeedback = lazy(() => import('./pages/AdminFeedback'));
const AdminKinks = lazy(() => import('./pages/AdminKinks'));
const AdminDevTools = lazy(() => import('./pages/AdminDevTools'));

// 🧭 Lazy Dashboards
const RequireDashboard = lazy(() => import('./dashboards/RequireDashboard'));
const AdminDashboard = lazy(() => import('./dashboards/admin'));
const DashboardDom = lazy(() => import('./dashboards/dom'));
const DashboardSub = lazy(() => import('./dashboards/sub'));
const DashboardSwitch = lazy(() => import('./dashboards/switch'));

// 🧱 Overlay Sidebars
import AdminSidebar from './components/AdminSidebar';
import UserSidebar from './components/UserSidebar';

const AppContent = () => {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="h-screen overflow-hidden flex flex-col">
        <Header user={user} onLogout={logout} />

        <LayoutWrapper>
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<PublicProfile />} />
              <Route path="/users" element={<UserDirectory />} />
              <Route path="/feedback/:jobId/:toUserId" element={<FeedbackForm />} />

              {/* Dashboards */}
              <Route path="/dashboard" element={<RequireDashboard />} />
              <Route path="/dashboard/dom" element={<DashboardDom />} />
              <Route path="/dashboard/sub" element={<DashboardSub />} />
              <Route path="/dashboard/switch" element={<DashboardSwitch />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/jobs" element={<AdminJobs />} />
              <Route path="/admin/feedback" element={<AdminFeedback />} />
              <Route path="/admin/kinks" element={<AdminKinks />} />
              <Route path="/admin/devtools" element={<AdminDevTools />} />

              {/* JobsHub & Nested Job Pages */}
              <Route path="/jobs" element={<JobsHub />}>
                <Route index element={<PublicJobsBoard />} />
                <Route path="listings" element={<DomJobListings />} />
                <Route path="applications" element={<DomApplicationsList />} />
                <Route path="active" element={<DomActiveJobs />} />
                <Route path="history" element={<DomJobHistory />} />
                <Route path="post" element={<DomJobPost />} />
                <Route path="sub-applications" element={<SubApplicationsList />} />
                <Route path="sub-active" element={<SubAcceptedJobs />} />
                <Route path="sub-history" element={<SubJobHistory />} />
                <Route path=":jobId" element={<JobDetail />} />
              </Route>

              <Route path="/jobs/edit/:jobId" element={<DomJobPost />} />
              <Route path="/dom/applications" element={<DomApplicationsList />} />
            </Routes>
          </Suspense>
        </LayoutWrapper>

        <Footer />

        {user && (
          <div className="fixed top-0 right-0 h-full z-50">
            {user.isAdmin ? (
              <AdminSidebar />
            ) : (
              <UserSidebar role={user.role} />
            )}
          </div>
        )}

        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </Router>
  );
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
