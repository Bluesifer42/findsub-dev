import { Link } from 'react-router-dom';

function UserSidebar({ role }) {
  return (
    <aside className="sidebar">
      <button className="collapse-btn">☰</button>
      <nav>
        <ul>
          <li><Link to={`/dashboard/${role?.toLowerCase()}`}>Dashboard</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/jobs">Job Offers</Link></li>
          <li><Link to="/messages">Messages</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/users">Find Members</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default UserSidebar;
