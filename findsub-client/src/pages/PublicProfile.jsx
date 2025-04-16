import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PublicProfile() {
  const { userId } = useParams();
  const [feedback, setFeedback] = useState([]);
  const [userMeta, setUserMeta] = useState({});
  const [generalAvg, setGeneralAvg] = useState(null);
  const [kinkAvg, setKinkAvg] = useState({});

  useEffect(() => {
    // Fetch feedback for the user (as recipient)
    fetch(`http://localhost:5000/api/feedback/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setFeedback(data.feedback);
        if (data.feedback.length > 0) {
          // Calculate general average ratings from the generalRatings field.
          const generalRatings = data.feedback
            .filter(f => f.generalRatings && typeof f.generalRatings === 'object')
            .map(f => {
              const values = Object.values(f.generalRatings).map(v => Number(v));
              return values.reduce((a, b) => a + b, 0) / values.length;
            });
          if (generalRatings.length > 0) {
            const avg = generalRatings.reduce((a, b) => a + b, 0) / generalRatings.length;
            setGeneralAvg(avg.toFixed(1));
          }

          // Calculate average ratings for each kink from the interestRatings field.
          const ratingSums = {};
          const ratingCounts = {};
          data.feedback.forEach(f => {
            if (f.interestRatings && typeof f.interestRatings === 'object') {
              Object.entries(f.interestRatings).forEach(([kink, rating]) => {
                if (rating !== null && !isNaN(Number(rating))) {
                  ratingSums[kink] = (ratingSums[kink] || 0) + Number(rating);
                  ratingCounts[kink] = (ratingCounts[kink] || 0) + 1;
                }
              });
            }
          });
          const kinkAverages = {};
          Object.keys(ratingSums).forEach(kink => {
            kinkAverages[kink] = (ratingSums[kink] / ratingCounts[kink]).toFixed(1);
          });
          setKinkAvg(kinkAverages);
        }
      })
      .catch(err => {
        console.error('Feedback fetch error:', err);
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
      <p><strong>Reputation Score:</strong> {userMeta?.reputationScore ? `${userMeta.reputationScore} / 5` : 'No ratings yet'}</p>
      {generalAvg && (
        <p><strong>General Average Rating:</strong> {generalAvg} / 5</p>
      )}
      <h3>Average Kink Ratings</h3>
      {Object.keys(kinkAvg).length === 0 ? (
        <p>No kink ratings available.</p>
      ) : (
        <ul>
          {Object.entries(kinkAvg).map(([kink, avg]) => (
            <li key={kink}>{kink}: {avg} / 5</li>
          ))}
        </ul>
      )}
      <h3>Feedback Received</h3>
      {feedback.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedback.map(f => (
          <div key={f._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>From:</strong> {f.fromUser.username} ({f.fromUser.role})</p>
            {f.generalRatings && typeof f.generalRatings === 'object' && (
              <>
                <p><strong>General Ratings:</strong></p>
                <ul>
                  {Object.entries(f.generalRatings).map(([key, value]) => (
                    <li key={key}>{key}: {value} / 5</li>
                  ))}
                </ul>
              </>
            )}
            {f.interestRatings && typeof f.interestRatings === 'object' && (
              <>
                <p><strong>Interest Ratings:</strong></p>
                <ul>
                  {Object.entries(f.interestRatings).map(([key, value]) => (
                    <li key={key}>{key}: {value !== null ? `${value} / 5` : 'N/A'}</li>
                  ))}
                </ul>
              </>
            )}
            {typeof f.honestyScore !== 'undefined' && (
              <p><strong>Honesty Score:</strong> {f.honestyScore} / 5</p>
            )}
            {f.comment && <p><strong>Comment:</strong> {f.comment}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default PublicProfile;
