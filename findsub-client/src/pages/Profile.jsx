import { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/profile/${user?._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Profile updated successfully.');
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Save error:', err);
      setStatus('❌ Failed to update profile.');
    }
  };

  const handleVerifyEmail = () => {
    setUser((prev) => ({ ...prev, emailVerified: true }));
    setStatus('✅ Email marked as verified (mock)');
  };

  const handleVerifyPhone = () => {
    setUser((prev) => ({ ...prev, phoneVerified: true }));
    setStatus('✅ Phone marked as verified (mock)');
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>My Profile</h2>

      <form onSubmit={handleSave}>
        <label>Username:<br />
          <input
            name="username"
            value={user.username || ''}
            onChange={handleChange}
          />
        </label><br />

        <label>Email:<br />
          <input
            name="email"
            value={user.email || ''}
            onChange={handleChange}
          />
          {user.emailVerified ? ' ✅' : ' ❌'}
          {!user.emailVerified && <button type="button" onClick={handleVerifyEmail}>Verify Email</button>}
        </label><br />

        <label>Phone Number:<br />
          <input
            name="phoneNumber"
            value={user.phoneNumber || ''}
            onChange={handleChange}
          />
          {user.phoneVerified ? ' ✅' : ' ❌'}
          {!user.phoneVerified && <button type="button" onClick={handleVerifyPhone}>Verify Phone</button>}
        </label><br />

        <label>Experience Level:<br />
          <select
            name="experienceLevel"
            value={user.experienceLevel || 'Beginner'}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </label><br />

        <label>Interests (comma-separated):<br />
          <input
            name="interests"
            value={user.interests?.join(', ') || ''}
            onChange={(e) =>
              setUser({
                ...user,
                interests: e.target.value.split(',').map(tag => tag.trim())
              })
            }
          />
        </label><br />

        <label>Limits:<br />
          <textarea
            name="limits"
            value={user.limits || ''}
            onChange={handleChange}
          />
        </label><br />

        <button type="submit">Save Changes</button>
      </form>

      <p>{status}</p>
    </div>
  );
}

export default Profile;
