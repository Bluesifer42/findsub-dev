// Register.jsx

import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    gender: '',
    dateOfBirth: '',
    experienceLevel: 'Beginner',
    phoneNumber: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Registration successful! Redirecting...');
        setTimeout(() => (window.location.href = '/login'), 2000);
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setStatus('❌ Server error. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <select name="role" onChange={handleChange} required className="w-full p-2 border">
          <option value="">Select Role</option>
          <option value="Sub">Sub</option>
          <option value="Switch">Switch</option>
          <option value="Dom">Dom</option>
        </select>
        <select name="gender" onChange={handleChange} required className="w-full p-2 border">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          name="dateOfBirth"
          type="date"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full p-2 border"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          name="phoneNumber"
          placeholder="Phone Number (optional)"
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2">
          Register
        </button>
      </form>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}

export default Register;
