// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { useAuth } from './context/useAuth';

import Login from './pages/Login';
import Register from './pages/Register';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import UserDirectory from './pages/UserDirectory';
import JobsHub from './pages/JobsHub';
import JobDetail from './pages/JobDetail';
import FeedbackForm from './pages/FeedbackForm';

import DomJobPost from './pages/DomJobPost';

import AdminUsers from './pages/AdminUsers';
import AdminJobs from './pages/AdminJobs';
import AdminFeedback from './pages/AdminFeedback';
import AdminKinks from './pages/AdminKinks';
import AdminDevTools from './pages/AdminDevTools';

import AdminSidebar from './components/AdminSidebar';
import UserSidebar from './components/UserSidebar';

import RequireDashboard from './dashboards/RequireDashboard';
import AdminDashboard from './dashboards/Admin';
import DashboardDom from './dashboards/Dom';
import DashboardSub from './dashboards/Sub';
import DashboardSwitch from './dashboards/Switch';

const AppContent = () => {
  const { user, logout } = useAuth(); // ✅ use correct logout here

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1 style={{ flex: 1 }}>FindSub</h1>
          <div className="user-info">
            {user ? (
              <>
                <span>{user.username}</span>
                <button
                  className="logout-btn"
                  onClick={() => {
                    logout(); // ✅ properly clears token and user
                    window.location.href = '/login'; // ✅ full redirect
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

        {user && (
          <aside className="sidebar">
            {user.isAdmin ? (
              <AdminSidebar />
            ) : (
              <UserSidebar role={user.role} />
            )}
          </aside>
        )}

        <main className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<RequireDashboard />} />
            <Route path="/dashboard/dom" element={<DashboardDom />} />
            <Route path="/dashboard/sub" element={<DashboardSub />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/switch" element={<DashboardSwitch />} />
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
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 FindSub. All rights reserved.</p>
        </footer>
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
