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
          const ratings = data.feedback.map(f => f.rating);
          const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
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
            <p><strong>Rating:</strong> ⭐ {f.rating} / 5</p>
            {f.comment && <p><strong>Comment:</strong> {f.comment}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default PublicProfile;
