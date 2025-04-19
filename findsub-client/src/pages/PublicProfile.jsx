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
    // Load user info
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error('User load error:', err));

    // Load feedback
    fetch(`http://localhost:5000/api/feedback/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        const fb = data.feedback;
        setFeedback(fb);
        processRatings(fb);
        processBadges(fb);
        setLoading(false);
      })
      .catch(err => {
        console.error('Feedback load error:', err);
        setLoading(false);
      });
  }, [userId]);

  const processRatings = (feedbackArray) => {
    const tally = {};
    const counts = {};
    feedbackArray.forEach(f => {
      if (f.generalRatings) {
        for (let key in f.generalRatings) {
          tally[key] = (tally[key] || 0) + f.generalRatings[key];
          counts[key] = (counts[key] || 0) + 1;
        }
      }
    });
    const avg = {};
    for (let key in tally) {
      avg[key] = (tally[key] / counts[key]).toFixed(1);
    }
    setRatingAverages(avg);
  };

  const processBadges = (feedbackArray) => {
    const summary = {};
    feedbackArray.forEach(f => {
      if (f.badgeGifting) {
        for (let kinkId in f.badgeGifting) {
          summary[kinkId] = (summary[kinkId] || 0) + f.badgeGifting[kinkId];
        }
      }
    });
    setBadgeSummary(summary);
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>{user.username}'s Profile</h2>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Experience:</strong> {user.experienceLevel}</p>

      <h3>Trust & Performance</h3>
      {Object.keys(ratingAverages).length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        <ul>
          {Object.entries(ratingAverages).map(([trait, avg]) => (
            <li key={trait}><strong>{trait}:</strong> {avg} / 5</li>
          ))}
        </ul>
      )}

      {Object.keys(badgeSummary).length > 0 && (
        <>
          <h3>Kink Badges Earned</h3>
          <ul>
            {Object.entries(badgeSummary).map(([kinkId, count]) => (
              <li key={kinkId}>
                <strong>Kink {kinkId}:</strong> {count} badge{count > 1 ? 's' : ''}
              </li>
            ))}
          </ul>
        </>
      )}

      <h3>Feedback Received</h3>
      {feedback.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedback.map((f, i) => (
          <div key={i} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
            <p>
              From: <Link to={`/profile/${f.fromUser._id}`}>{f.fromUser.username}</Link> ({f.fromUser.role})
            </p>
            {f.comment && <p><em>"{f.comment}"</em></p>}
            {f.honestyScore && <p>Honesty: {f.honestyScore}/5</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default PublicProfile;
