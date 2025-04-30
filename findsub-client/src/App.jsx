// File: src/App.jsx
// Purpose: Main React app shell, handles layout, routing, user context, and toast notifications.
// Standards:
// - Uses camelCase for all identifiers
// - Full layout is modular and annotated
// - Uses react-toastify for UI notifications (not alert())
// - Calls logout() from context hook (clears token + user)
// - Routes and logic are centralized and readable

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserProvider } from './context/UserContext';
import { useAuth } from './context/useAuth';

// 🧩 Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import UserDirectory from './pages/UserDirectory';
import JobsHub from './pages/features/JobsHub';
import JobDetail from './pages/jobs/JobDetail';
import FeedbackForm from './pages/jobs/JobFeedbackForm';
import DomJobPost from './pages/jobs/dom/DomJobPost';
import DomApplicationsList from './pages/jobs/dom/DomApplicationsList';


// 🛠 Admin Pages
import AdminUsers from './pages/AdminUsers';
import AdminJobs from './pages/AdminJobs';
import AdminFeedback from './pages/AdminFeedback';
import AdminKinks from './pages/AdminKinks';
import AdminDevTools from './pages/AdminDevTools';

// 🧱 UI Components
import AdminSidebar from './components/AdminSidebar';
import UserSidebar from './components/UserSidebar';

// 🧭 Dashboards
import RequireDashboard from './dashboards/RequireDashboard';
import AdminDashboard from './dashboards/Admin';
import DashboardDom from './dashboards/Dom';
import DashboardSub from './dashboards/Sub';
import DashboardSwitch from './dashboards/Switch';

// 🧠 Core Layout & Routing
const AppContent = () => {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="app-container">
        {/* 🔷 Header */}
        <header className="header">
          <h1 style={{ flex: 1 }}>FindSub</h1>
          <div className="user-info">
            {user ? (
              <>
                <span>{user.username}</span>
                <button
                  className="logout-btn"
                  onClick={() => {
                    logout(); // Proper logout from useAuth (clears localStorage)
                    window.location.href = '/login'; // Redirect after logout
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <span>Not logged in</span>
            )}
          </div>
        </header>

        {/* 🧭 Sidebar Navigation */}
        {user && (
          <aside className="sidebar">
            {user.isAdmin ? (
              <AdminSidebar />
            ) : (
              <UserSidebar role={user.role} />
            )}
          </aside>
        )}

        {/* 🛤 Main App Routes */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<RequireDashboard />} />
            <Route path="/dashboard/dom" element={<DashboardDom />} />
            <Route path="/dashboard/sub" element={<DashboardSub />} />
            <Route path="/dashboard/switch" element={<DashboardSwitch />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/jobs" element={<JobsHub />} />
            <Route path="/job/:jobId" element={<JobDetail />} />
            <Route path="/jobs/edit/:jobId" element={<DomJobPost />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<PublicProfile />} />
            <Route path="/users" element={<UserDirectory />} />
            <Route path="/feedback/:jobId/:toUserId" element={<FeedbackForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/feedback" element={<AdminFeedback />} />
            <Route path="/admin/kinks" element={<AdminKinks />} />
            <Route path="/admin/devtools" element={<AdminDevTools />} />
            <Route path="/dom/applications" element={<DomApplicationsList />} />
          </Routes>
        </main>

        {/* 📜 Footer */}
        <footer className="footer">
          <p>&copy; 2025 FindSub. All rights reserved.</p>
        </footer>

        {/* ✅ Toast Popup Handler */}
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </Router>
  );
};

// 🧠 App Root
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
