// /pages/Login.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { UserContext } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('Logging in...');
  
    try {
      const { user, token } = await loginUser(email, password);
  
      // ✅ Save token for future API requests
      localStorage.setItem('token', token);
      console.log('🔐 [Login] Token saved to localStorage:', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
  
      setStatus('✅ Login successful');
  
      // ✅ Redirect based on role
      if (user.isAdmin) navigate('/admin');
      else if (user.role === 'Dom') navigate('/dashboard/dom');
      else if (user.role === 'Sub') navigate('/dashboard/sub');
      else navigate('/dashboard/switch');
    } catch (err) {
      console.error('Login error:', err);
      setStatus(`❌ ${err.message || 'Invalid credentials'}`);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          className="w-full border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2"
        >
          Login
        </button>
      </form>

      {status && (
        <p className={`mt-4 ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </div>
  );
}

export default Login;
