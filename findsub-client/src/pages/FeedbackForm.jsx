import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DomFeedbackFields from './DomFeedbackFields';
import SubFeedbackFields from './SubFeedbackFields';
import SharedFeedbackFields from './SharedFeedbackFields';

function FeedbackForm() {
  const { jobId, toUserId } = useParams();
  const fromUser = JSON.parse(localStorage.getItem('user')) || {};
  const [job, setJob] = useState(null);
  const [status, setStatus] = useState('');

  // Feedback state
  const [generalRatings, setGeneralRatings] = useState({});
  const [interestRatings, setInterestRatings] = useState({});
  const [badgeGifting, setBadgeGifting] = useState({});
  const [honestyScore, setHonestyScore] = useState(5);
  const [comment, setComment] = useState('');

  // Load job details
  useEffect(() => {
    fetch(`http://localhost:5000/api/job/${jobId}`)
      .then(res => res.json())
      .then(data => setJob(data.job))
      .catch(() => setStatus('❌ Failed to load job data.'));
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      jobId,
      fromUser: fromUser._id,
      toUser: toUserId,
      generalRatings,
      interestRatings,
      badgeGifting,
      honestyScore,
      comment
    };

    try {
      const res = await fetch('http://localhost:5000/api/feedback/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('✅ Feedback submitted successfully.');
      } else {
        setStatus(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to submit feedback.');
    }
  };

  if (!job) return <p>Loading job data...</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>Leave Feedback</h2>
      {status && <p>{status}</p>}

      <form onSubmit={handleSubmit}>
        {fromUser.role === 'Dom' ? (
          <DomFeedbackFields
            setGeneralRatings={setGeneralRatings}
            setInterestRatings={setInterestRatings}
            setBadgeGifting={setBadgeGifting}
            requiredKinks={job.requiredKinks}
          />
        ) : (
          <SubFeedbackFields
            setGeneralRatings={setGeneralRatings}
          />
        )}

        <SharedFeedbackFields
          honestyScore={honestyScore}
          setHonestyScore={setHonestyScore}
          comment={comment}
          setComment={setComment}
        />

        <button type="submit" style={{ marginTop: '1rem' }}>Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
