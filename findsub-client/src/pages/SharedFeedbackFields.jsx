import React from 'react';

function SharedFeedbackFields({ honestyScore, setHonestyScore, comment, setComment }) {
  return (
    <div>
      <h3>Honesty Score</h3>
      <p>How honest and transparent was this user?</p>
      <input
        type="number"
        min={1}
        max={5}
        value={honestyScore}
        onChange={e => setHonestyScore(Number(e.target.value))}
        required
      />

      <h3 style={{ marginTop: '1rem' }}>Comment</h3>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        rows={5}
        style={{ width: '100%', marginBottom: '1rem' }}
        placeholder="Share your thoughts about this session..."
        required
      />
    </div>
  );
}

export default SharedFeedbackFields;
