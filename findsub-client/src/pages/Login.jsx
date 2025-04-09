import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
        setStatus(`✅ Welcome, ${data.user.username} (${data.user.role})`);
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
      
        // Redirect based on role
        if (data.user.role === 'Dom') {
          window.location.href = '/dashboard/dom';
        } else if (data.user.role === 'Sub') {
          window.location.href = '/dashboard/sub';
        } else {
          window.location.href = '/dashboard/switch';
        }
      }
      
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Login</button>
      </form>

      <p>{status}</p>
    </div>
  );
}

export default Login;
