import { useEffect, useState } from 'react';
import KinksTab from './KinksTab';

function Profile() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [tab, setTab] = useState('info'); // available tabs: 'info', 'kinks', 'feedback'

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

  // Component to display feedback received by the user.
  const FeedbackSection = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
      if (user?._id) {
        fetch(`http://localhost:5000/api/feedback/user/${user._id}`)
          .then((res) => res.json())
          .then((data) => setFeedback(data.feedback))
          .catch((err) => console.error('Feedback fetch error:', err));
      }
    }, [user]);

    if (feedback.length === 0) return <p>No feedback available.</p>;

    return (
      <div>
        <h3>Your Feedback</h3>
        {feedback.map((f) => (
          <div
            key={f._id}
            style={{
              border: '1px solid #ccc',
              padding: '0.5rem',
              marginBottom: '0.5rem'
            }}
          >
            <p>
              <strong>From:</strong> {f.fromUser.username} ({f.fromUser.role})
            </p>
            {f.generalRatings && typeof f.generalRatings === 'object' && (
              <div>
                <p>
                  <strong>General Ratings:</strong>
                </p>
                <ul>
                  {Object.entries(f.generalRatings).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value} / 5
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {f.honestyScore !== undefined && (
              <p>
                <strong>Honesty Score:</strong> {f.honestyScore} / 5
              </p>
            )}
            {f.comment && (
              <p>
                <strong>Comment:</strong> {f.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>My Profile</h2>

      {/* Tab navigation */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => setTab('info')}
          style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
        >
          Info
        </button>
        <button
          onClick={() => setTab('kinks')}
          style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
        >
          Kinks
        </button>
        <button
          onClick={() => setTab('feedback')}
          style={{ padding: '0.5rem 1rem' }}
        >
          Feedback
        </button>
      </div>

      {/* Tab content */}
      {tab === 'info' && (
        <div>
          <form onSubmit={handleSave}>
            <label>
              Username:
              <br />
              <input
                name="username"
                value={user.username || ''}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <br />
              <input
                name="email"
                value={user.email || ''}
                onChange={handleChange}
              />
              {user.emailVerified ? ' ✅' : ' ❌'}
              {!user.emailVerified && (
                <button type="button" onClick={handleVerifyEmail}>
                  Verify Email
                </button>
              )}
            </label>
            <br />
            <label>
              Phone Number:
              <br />
              <input
                name="phoneNumber"
                value={user.phoneNumber || ''}
                onChange={handleChange}
              />
              {user.phoneVerified ? ' ✅' : ' ❌'}
              {!user.phoneVerified && (
                <button type="button" onClick={handleVerifyPhone}>
                  Verify Phone
                </button>
              )}
            </label>
            <br />
            <label>
              Experience Level:
              <br />
              <select
                name="experienceLevel"
                value={user.experienceLevel || 'Beginner'}
                onChange={handleChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
            <br />
            <label>
              Limits:
              <br />
              <textarea
                name="limits"
                value={user.limits || ''}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Save Changes</button>
          </form>
          <p>{status}</p>
        </div>
      )}

      {tab === 'kinks' && (
        <div>
          <h3>Your Kinks</h3>
          <KinksTab />
          <p>{status}</p>
        </div>
      )}

      {tab === 'feedback' && (
        <div>
          <FeedbackSection />
        </div>
      )}
    </div>
  );
}

export default Profile;
