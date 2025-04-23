// /components/NavBar.jsx

import { Link, useNavigate } from 'react-router-dom';

function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide hover:text-blue-300">
        FindSub
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">{user.username}</span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-sm">Not logged in</span>
        )}
      </div>
    </header>
  );
}

export default NavBar;
