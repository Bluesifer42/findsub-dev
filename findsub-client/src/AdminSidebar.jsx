import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <aside className="sidebar">
      <button className="collapse-btn">☰</button>
      <nav>
        <ul>
          <li><Link to="/admin">Admin Dashboard</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/admin/jobs">Manage Jobs</Link></li>
          <li><Link to="/admin/feedback">Manage Feedback</Link></li>
          <li><Link to="/admin/kinks">Kink Manager</Link></li>
          <li><Link to="/admin/devtools">Dev Tools</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
