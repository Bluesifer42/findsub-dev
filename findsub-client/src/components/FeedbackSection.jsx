// /components/FeedbackSection.jsx

import { useEffect, useState } from 'react';

function FeedbackSection({ userId }) {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/feedback/user/${userId}`)
      .then(res => res.json())
      .then(data => setFeedback(data.feedback || []))
      .catch(err => console.error('Feedback fetch error:', err));
  }, [userId]);

  if (feedback.length === 0) return <p>No feedback available.</p>;

  return (
    <div>
      <h3 className="font-semibold mb-2">Your Feedback</h3>
      {feedback.map((f) => (
        <div key={f._id} className="border p-2 mb-3">
          <p><strong>From:</strong> {f.fromUser.username} ({f.fromUser.role})</p>
          {f.generalRatings && (
            <>
              <p className="mt-1"><strong>General Ratings:</strong></p>
              <ul>
                {Object.entries(f.generalRatings).map(([key, val]) => (
                  <li key={key}>{key}: {val} / 5</li>
                ))}
              </ul>
            </>
          )}
          {f.honestyScore !== undefined && (
            <p><strong>Honesty Score:</strong> {f.honestyScore} / 5</p>
          )}
          {f.comment && <p><strong>Comment:</strong> {f.comment}</p>}
        </div>
      ))}
    </div>
  );
}

export default FeedbackSection;
