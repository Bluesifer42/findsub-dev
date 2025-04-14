import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import DashboardDom from './pages/DashboardDom';
import DashboardSub from './pages/DashboardSub';
import DashboardSwitch from './pages/DashboardSwitch';
import Register from './pages/Register';
import JobPost from './pages/JobPost';
import JobManager from './pages/JobManager';
import MyJobs from './pages/MyJobs';
import PublicProfile from './pages/PublicProfile';
import UserDirectory from './pages/UserDirectory';
import JobsHub from './pages/JobsHub';
import JobDetail from './pages/JobDetail';  // NEW: Import JobDetail page

function App() {
  return (
    <Router>
      <div className="app-container">
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

        <main className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Jobs" element={<JobsHub />} />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/dashboard/dom" element={<DashboardDom />} />
            <Route path="/dashboard/sub" element={<DashboardSub />} />
            <Route path="/dashboard/switch" element={<DashboardSwitch />} />
            <Route path="/profile/:userId" element={<PublicProfile />} />
            <Route path="/users" element={<UserDirectory />} />
            <Route path="/jobs/edit/:jobId" element={<JobPost />} />
            <Route path="/job/:jobId" element={<JobDetail />} /> {/* NEW: Job Detail Route */}
            {/* You can also add routes for JobManager and MyJobs if needed */}
          </Routes>
        </main>

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

        <footer className="footer">
          <p>&copy; 2025 FindSub. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
