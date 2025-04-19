import { Link, useNavigate } from 'react-router-dom';

function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <h1 style={{ flex: 1 }}>FindSub</h1>
      <div className="user-info">
        {user ? (
          <>
            <span>{user.username}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </header>
  );
}

export default NavBar;
