import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PublicProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [ratingAverages, setRatingAverages] = useState({});
  const [badgeSummary, setBadgeSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchFeedbackData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error('User load error:', err);
    }
  };

  const fetchFeedbackData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/feedback/user/${userId}`);
      const data = await res.json();
      setFeedback(data.feedback || []);
      processRatings(data.feedback || []);
      processBadges(data.feedback || []);
    } catch (err) {
      console.error('Feedback load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const processRatings = (feedbackArray) => {
    const tally = {}, counts = {};
    feedbackArray.forEach(fb => {
      if (fb.generalRatings) {
        Object.entries(fb.generalRatings).forEach(([key, val]) => {
          tally[key] = (tally[key] || 0) + val;
          counts[key] = (counts[key] || 0) + 1;
        });
      }
    });
    const averages = {};
    Object.keys(tally).forEach(key => {
      averages[key] = (tally[key] / counts[key]).toFixed(1);
    });
    setRatingAverages(averages);
  };

  const processBadges = (feedbackArray) => {
    const summary = {};
    feedbackArray.forEach(fb => {
      if (fb.badgeGifting) {
        Object.entries(fb.badgeGifting).forEach(([kinkId, count]) => {
          summary[kinkId] = (summary[kinkId] || 0) + count;
        });
      }
    });
    setBadgeSummary(summary);
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!user) return <p className="text-center text-red-600">User not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{user.username}'s Profile</h2>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Experience:</strong> {user.experienceLevel}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">⭐ Trust & Performance</h3>
        {Object.keys(ratingAverages).length === 0 ? (
          <p className="text-gray-600">No ratings yet.</p>
        ) : (
          <ul className="list-disc ml-5 mt-2">
            {Object.entries(ratingAverages).map(([key, avg]) => (
              <li key={key}><strong>{key}:</strong> {avg} / 5</li>
            ))}
          </ul>
        )}
      </div>

      {Object.keys(badgeSummary).length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">🎖 Kink Badges Earned</h3>
          <ul className="list-disc ml-5 mt-2">
            {Object.entries(badgeSummary).map(([kinkId, count]) => (
              <li key={kinkId}>
                <strong>Kink {kinkId}:</strong> {count} badge{count > 1 ? 's' : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold">📝 Feedback Received</h3>
        {feedback.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedback.map((f, i) => (
            <div key={i} className="border-b pb-2 mb-3">
              <p>
                From: <Link to={`/profile/${f.fromUser._id}`} className="text-blue-600 hover:underline">
                  {f.fromUser.username}</Link> ({f.fromUser.role})
              </p>
              {f.comment && <p className="italic">"{f.comment}"</p>}
              {f.honestyScore !== undefined && <p>Honesty: {f.honestyScore}/5</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PublicProfile;
