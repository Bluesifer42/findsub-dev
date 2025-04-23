import { useEffect, useState } from 'react';
import KinksTab from './KinksTab';
import FeedbackSection from '../components/FeedbackSection';
import ProfileForm from '../components/ProfileForm';

function Profile() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [tab, setTab] = useState('info');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setStatus('✅ Profile updated.');
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to update profile.');
    }
  };

  const handleVerifyEmail = () => {
    setUser((prev) => ({ ...prev, emailVerified: true }));
    setStatus('✅ Email marked verified (mock)');
  };

  const handleVerifyPhone = () => {
    setUser((prev) => ({ ...prev, phoneVerified: true }));
    setStatus('✅ Phone marked verified (mock)');
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="mb-4 flex gap-2">
        <button onClick={() => setTab('info')} className="bg-gray-200 px-3 py-1">Info</button>
        <button onClick={() => setTab('kinks')} className="bg-gray-200 px-3 py-1">Kinks</button>
        <button onClick={() => setTab('feedback')} className="bg-gray-200 px-3 py-1">Feedback</button>
      </div>

      {tab === 'info' && (
        <ProfileForm
          user={user}
          onChange={handleChange}
          onSave={handleSave}
          onVerifyEmail={handleVerifyEmail}
          onVerifyPhone={handleVerifyPhone}
          status={status}
        />
      )}

      {tab === 'kinks' && <KinksTab />}
      {tab === 'feedback' && <FeedbackSection userId={user._id} />}
    </div>
  );
}

export default Profile;
