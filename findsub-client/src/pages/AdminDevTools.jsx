import { useState } from 'react';

function AdminDevTools() {
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    username: '',
    email: '',
    role: 'Sub',
    isAdmin: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Creating user...');
  
    const res = await fetch('http://localhost:5000/api/admin/create-test-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username,
        role: form.role,
        isAdmin: form.isAdmin
      })
    });
  
    const data = await res.json();
    if (res.ok) {
      setStatus(`✅ Created user: ${data.user.username} (${data.user.email})`);
      setForm({ username: '', role: 'Sub', isAdmin: false });
    } else {
      setStatus(`❌ ${data.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Admin DevTools</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="TestUsername"
          value={form.username}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        <select name="role" value={form.role} onChange={handleChange} style={{ width: '100%', marginBottom: '0.5rem' }}>
          <option value="Sub">Sub</option>
          <option value="Dom">Dom</option>
          <option value="Switch">Switch</option>
        </select>
        <label>
          <input type="checkbox" name="isAdmin" checked={form.isAdmin} onChange={handleChange} />
          Make Admin
        </label>
        <br />
        <button type="submit">Create Test User</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
}

export default AdminDevTools;
