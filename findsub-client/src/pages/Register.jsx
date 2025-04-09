import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    gender: '',
    dateOfBirth: '',
    experienceLevel: '',
    interests: '',
    limits: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      interests: formData.interests.split(',').map((tag) => tag.trim())
    };

    const res = await fetch(`http://localhost:5000/api/register`, {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('✅ Registration successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      setStatus(`❌ ${data.message}`);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />

        <select name="role" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Sub">Sub</option>
          <option value="Switch">Switch</option>
          <option value="Dom">Dom</option>
        </select><br />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select><br />

        <input name="dateOfBirth" type="date" onChange={handleChange} required /><br />

        <select name="experienceLevel" onChange={handleChange}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select><br />

        <input name="interests" placeholder="Interests (comma-separated)" onChange={handleChange} /><br />
        <textarea name="limits" placeholder="List any hard limits or boundaries" onChange={handleChange}></textarea><br />

        <button type="submit">Register</button>
      </form>

      <p>{status}</p>
    </div>
  );
}

export default Register;
