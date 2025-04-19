import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <aside className="sidebar">
      <button className="collapse-btn">☰</button>
      <nav>
        <ul>
          <li><Link to="/dashboard/admin">Admin Dashboard</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/admin/jobs">Manage Jobs</Link></li>
          <li><Link to="/admin/feedback">Manage Feedback</Link></li>
          <li><Link to="/admin/kinks">Kink Manager</Link></li>
          <li><Link to="/admin/devtools">DevTools</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
