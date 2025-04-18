import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// General pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import UserDirectory from './pages/UserDirectory';
import JobsHub from './pages/JobsHub';
import JobDetail from './pages/JobDetail';

// Role dashboards
import DashboardDom from './pages/DashboardDom';
import DashboardSub from './pages/DashboardSub';
import DashboardSwitch from './pages/DashboardSwitch';

// NEW: Dom-only job posting page
import DomJobPost from './pages/DomJobPost';

function App() {
  return (
    <Router>
      <div className="app-container">

        {/* Header */}
        <header className="header">
          <h1 style={{ flex: 1 }}>FindSub</h1>
          <div className="user-info">
            {localStorage.getItem('user') ? (
              <>
                <span>{JSON.parse(localStorage.getItem('user')).username}</span>
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

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            {/* Core auth routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />

            {/* Role dashboards */}
            <Route path="/dashboard/dom" element={<DashboardDom />} />
            <Route path="/dashboard/sub" element={<DashboardSub />} />
            <Route path="/dashboard/switch" element={<DashboardSwitch />} />

            {/* Main job system */}
            <Route path="/jobs" element={<JobsHub />} />
            <Route path="/job/:jobId" element={<JobDetail />} />
            <Route path="/jobs/edit/:jobId" element={<DomJobPost />} /> {/* ← Corrected route */}

            {/* Messaging and profiles */}
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<PublicProfile />} />
            <Route path="/users" element={<UserDirectory />} />
          </Routes>
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          <button className="collapse-btn">☰</button>
          <nav>
            <ul>
              <li>
                <Link to={
                  localStorage.getItem('user')
                    ? `/dashboard/${JSON.parse(localStorage.getItem('user')).role.toLowerCase()}`
                    : '/login'
                }>
                  Dashboard
                </Link>
              </li>
              <li><Link to="/Register">Register</Link></li>
              <li><Link to="/Jobs">Job Offers</Link></li>
              <li><Link to="/Messages">Messages</Link></li>
              <li><Link to="/Profile">Profile</Link></li>
              <li><Link to="/users">Find Members</Link></li>
            </ul>
          </nav>
        </aside>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 FindSub. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
