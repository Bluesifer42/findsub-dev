import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 🧭 General pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import UserDirectory from './pages/UserDirectory';
import JobsHub from './pages/JobsHub';
import JobDetail from './pages/JobDetail';
import FeedbackForm from './pages/FeedbackForm';

// 🧭 Role-specific dashboards
import DashboardDom from './pages/DashboardDom';
import DashboardSub from './pages/DashboardSub';
import DashboardSwitch from './pages/DashboardSwitch';

// 🛠️ Dom-only job posting/editing page
import DomJobPost from './pages/DomJobPost';

// 🔐 Admin-only
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminJobs from './pages/AdminJobs';
import AdminFeedback from './pages/AdminFeedback';
import AdminKinks from './pages/AdminKinks';
import AdminDevTools from './pages/AdminDevTools';



// ✅ Sidebar components
import AdminSidebar from './components/AdminSidebar';
import UserSidebar from './components/UserSidebar';

function App() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  return (
    <Router>
      <div className="app-container">

        {/* Header */}
        <header className="header">
          <h1 style={{ flex: 1 }}>FindSub</h1>
          <div className="user-info">
            {user ? (
              <>
                <span>{user.username}</span>
                <button
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.href = '/login';
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

        {/* Main view (routing area) */}
        <main className="main-content">
          <Routes>

            {/* 🔐 Auth & registration */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />

            {/* 🧭 Role dashboards */}
            <Route path="/dashboard/dom" element={<DashboardDom />} />
            <Route path="/dashboard/sub" element={<DashboardSub />} />
            <Route path="/dashboard/switch" element={<DashboardSwitch />} />

            {/* 📦 Main job system */}
            <Route path="/jobs" element={<JobsHub />} />
            <Route path="/job/:jobId" element={<JobDetail />} />
            <Route path="/jobs/edit/:jobId" element={<DomJobPost />} />

            {/* ✉️ Messaging and profiles */}
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<PublicProfile />} />
            <Route path="/users" element={<UserDirectory />} />

            {/* 🧭 Feedback Page */}
            <Route path="/feedback/:jobId/:toUserId" element={<FeedbackForm />} />

            {/* 🔐 Admin-only */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/feedback" element={<AdminFeedback />} />
            <Route path="/admin/kinks" element={<AdminKinks />} />
            <Route path="/admin/devtools" element={<AdminDevTools />} />



          </Routes>
        </main>

        {/* ✅ Sidebar Logic */}
        {user?.isAdmin ? (
          <AdminSidebar />
        ) : (
          <UserSidebar role={user?.role} />
        )}

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 FindSub. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
