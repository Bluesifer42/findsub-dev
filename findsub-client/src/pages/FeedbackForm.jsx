import React, { useState } from 'react';

const FeedbackForm = ({ jobId, fromUser, toUser, role, targetInterests }) => {
  // Define rating fields for each role:
  // When a Dom leaves feedback for a Sub:
  const domRatingFields = {
    obedience: 5,
    punctuality: 5,
    cleanliness: 5,
    respectfulness: 5,
    workEthic: 5,
    attentionToDetail: 5
  };
  // When a Sub leaves feedback for a Dom:
  const subRatingFields = {
    strictness: 5,
    communication: 5,
    safetyAftercare: 5,
    fairness: 5,
    taskClarity: 5,
    environment: 5
  };

  // Set initial general ratings based on who is leaving feedback.
  const initialGeneralRatings = role === 'Dom' ? domRatingFields :
                                role === 'Sub' ? subRatingFields : {};

  const [generalRatings, setGeneralRatings] = useState(initialGeneralRatings);

  // For Dom feedback only: set up interest-based ratings and badge gifting,
  // using the targetInterests from the Sub's profile.
  const [interestRatings, setInterestRatings] = useState(() => {
    if (role === 'Dom' && targetInterests && targetInterests.length > 0) {
      const init = {};
      targetInterests.forEach(interest => {
        init[interest] = 5;
      });
      return init;
    }
    return {};
  });

  const [badgeGifting, setBadgeGifting] = useState(() => {
    if (role === 'Dom' && targetInterests && targetInterests.length > 0) {
      const init = {};
      targetInterests.forEach(interest => {
        init[interest] = 0;
      });
      return init;
    }
    return {};
  });

  // For Dom feedback only: track if a given interest is applicable.
  const [interestApplicable, setInterestApplicable] = useState(() => {
    if (role === 'Dom' && targetInterests && targetInterests.length > 0) {
      const init = {};
      targetInterests.forEach(interest => {
        init[interest] = true;
      });
      return init;
    }
    return {};
  });

  // Honesty score defaults to 5, same for comment.
  const [honestyScore, setHonestyScore] = useState(5);
  const [comment, setComment] = useState('');

  // Update handler for general ratings.
  const handleGeneralRatingChange = (field, value) => {
    setGeneralRatings(prev => ({ ...prev, [field]: Number(value) }));
  };

  // For Dom feedback: update handler for interest ratings.
  const handleInterestRatingChange = (interest, value) => {
    setInterestRatings(prev => ({ ...prev, [interest]: Number(value) }));
  };

  // For Dom feedback: handler for adjusting badge gifting (0-5)
  const handleBadgeGiftingChange = (interest, delta) => {
    setBadgeGifting(prev => {
      const newVal = prev[interest] + delta;
      if (newVal < 0 || newVal > 5) return prev;
      return { ...prev, [interest]: newVal };
    });
  };

  const toggleInterestApplicable = (interest) => {
    setInterestApplicable(prev => ({
      ...prev,
      [interest]: !prev[interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build the payload.
    const payload = {
      jobId,
      fromUser,
      toUser,
      generalRatings,
      honestyScore,
      comment
    };

    // For Dom feedback, include interest-based fields.
    if (role === 'Dom' && targetInterests && targetInterests.length > 0) {
      const ir = {};
      targetInterests.forEach(interest => {
        ir[interest] = interestApplicable[interest] ? interestRatings[interest] : null;
      });
      payload.interestRatings = ir;
      payload.badgeGifting = badgeGifting;
    }

    // Log payload for debugging.
    console.log('Submitting feedback payload:', payload);

    try {
      const res = await fetch('http://localhost:5000/api/feedback/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      alert(data.message || 'Feedback submitted successfully!');
    } catch (err) {
      console.error('Error in submitting feedback:', err);
      alert('Error submitting feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{role === 'Dom' ? 'Rate the Sub' : 'Rate the Dom'}</h3>

      <h4>General Ratings (0-5)</h4>
      {Object.keys(generalRatings).map((field) => (
        <div key={field}>
          <label>
            {field.charAt(0).toUpperCase() + field.slice(1)} (0-5):{' '}
            <input
              type="number"
              min="0"
              max="5"
              value={generalRatings[field]}
              onChange={(e) => handleGeneralRatingChange(field, e.target.value)}
            />
          </label>
        </div>
      ))}

      {/* If a Dom is leaving feedback, show interest-based ratings and badge gifting options */}
      {role === 'Dom' && targetInterests && targetInterests.length > 0 && (
        <>
          <h4>Interest-Based Ratings & Badge Gifting (0-5)</h4>
          {targetInterests.map(interest => (
            <div key={interest} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '0.5rem' }}>
              <h5>{interest}</h5>
              <label>
                Applicable:{' '}
                <input
                  type="checkbox"
                  checked={interestApplicable[interest]}
                  onChange={() => toggleInterestApplicable(interest)}
                />
                (Uncheck if not applicable)
              </label>
              {interestApplicable[interest] && (
                <>
                  <div>
                    <label>
                      Rating (0-5):{' '}
                      <input
                        type="number"
                        min="0"
                        max="5"
                        value={interestRatings[interest]}
                        onChange={(e) => handleInterestRatingChange(interest, e.target.value)}
                      />
                    </label>
                  </div>
                  <div>
                    <p>Gift Badges (0-5):</p>
                    <button type="button" onClick={() => handleBadgeGiftingChange(interest, -1)}>-</button>
                    <span style={{ margin: '0 10px' }}>{badgeGifting[interest]}</span>
                    <button type="button" onClick={() => handleBadgeGiftingChange(interest, 1)}>+</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </>
      )}

      <div>
        <label>
          Honesty Score (0-5):{' '}
          <input
            type="number"
            min="0"
            max="5"
            value={honestyScore}
            onChange={(e) => setHonestyScore(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
