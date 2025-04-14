import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PublicProfile() {
  const { userId } = useParams();
  const [feedback, setFeedback] = useState([]);
  const [userMeta, setUserMeta] = useState({});
  const [average, setAverage] = useState(0);

  useEffect(() => {
    // Fetch feedback
    fetch(`http://localhost:5000/api/feedback/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setFeedback(data.feedback);
        if (data.feedback.length > 0) {
          // Average based on general ratings average, if available
          const allRatings = data.feedback.map(f => {
            if (f.generalRatings) {
              const values = Object.values(f.generalRatings);
              return values.reduce((a, b) => a + b, 0) / values.length;
            }
            return f.rating;
          });
          const avg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
          setAverage(avg.toFixed(1));
        }
      });

    // Fetch basic user info
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setUserMeta(data.user))
      .catch(() => setUserMeta({}));
  }, [userId]);

  return (
    <div>
      <h2>Public Profile</h2>

      <p><strong>Username:</strong> {userMeta?.username}</p>
      <p><strong>Role:</strong> {userMeta?.role}</p>
      <p><strong>Reputation Score:</strong> {average ? `${average} / 5` : 'No ratings yet'}</p>

      <h3>Feedback Received</h3>
      {feedback.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedback.map(f => (
          <div key={f._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>From:</strong> {f.fromUser.username} ({f.fromUser.role})</p>
            {f.generalRatings && (
              <>
                <p><strong>General Ratings:</strong></p>
                <ul>
                  {Object.entries(f.generalRatings).map(([key, value]) => (
                    <li key={key}>{key}: {value} / 5</li>
                  ))}
                </ul>
              </>
            )}
            {f.interestRatings && (
              <>
                <p><strong>Interest Ratings:</strong></p>
                <ul>
                  {Array.from(Object.entries(f.interestRatings)).map(([key, value]) => (
                    <li key={key}>{key}: {value !== null ? `${value} / 5` : 'N/A'}</li>
                  ))}
                </ul>
              </>
            )}
            {f.badgeGifting && (
              <>
                <p><strong>Badges Gifted:</strong></p>
                <ul>
                  {Array.from(Object.entries(f.badgeGifting)).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>
              </>
            )}
            <p><strong>Honesty Score:</strong> {f.honestyScore} / 5</p>
            {f.comment && <p><strong>Comment:</strong> {f.comment}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default PublicProfile;
