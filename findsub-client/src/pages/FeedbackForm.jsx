import React, { useState } from 'react';

// Updated helper functions to extract key and name from an interest object.
// If the interest has a 'kink' property (as stored in user.kinks), use that object's _id and name.
const getInterestKey = (interest) => {
  // If interest is a string, return it.
  if (typeof interest === 'string') return interest;
  // If interest is an object with a 'kink' property, return kink._id as string.
  if (interest && interest.kink) {
    if (typeof interest.kink === 'string') {
      return interest.kink;
    } else if (interest.kink._id) {
      return interest.kink._id.toString();
    }
  }
  // Fall back to the object's own _id if present.
  if (interest && interest._id) return interest._id.toString();
  return '';
};

const getInterestName = (interest) => {
  // If interest is a string, return it.
  if (typeof interest === 'string') return interest;
  // If interest is an object with a 'kink' property, return kink.name.
  if (interest && interest.kink) {
    if (typeof interest.kink === 'string') {
      return interest.kink;
    } else if (interest.kink.name) {
      return interest.kink.name;
    }
  }
  // Fall back to a generic "Unknown" if not found.
  return 'Unknown';
};

const FeedbackForm = ({ jobId, fromUser, toUser, role, targetInterests }) => {
  // Define general rating fields for each role:
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

  const initialGeneralRatings = role === 'Dom' ? domRatingFields : role === 'Sub' ? subRatingFields : {};

  const [generalRatings, setGeneralRatings] = useState(initialGeneralRatings);

  // For Dom feedback: set up interest-based ratings and badge gifting.
  const [interestRatings, setInterestRatings] = useState(() => {
    if (role === 'Dom' && targetInterests && targetInterests.length > 0) {
      const init = {};
      targetInterests.forEach((interest) => {
        const key = getInterestKey(interest);
        init[key] = 5; // default rating
      });
      return init;
    }
    return {};
  });

  const [badgeGifting, setBadgeGifting] = useState(() => {
    if (role === 'Dom' && targetInterests && targetInterests.length > 0) {
      const init = {};
      targetInterests.forEach((interest) => {
        const key = getInterestKey(interest);
        init[key] = 0; // default badges: 0
      });
      return init;
    }
    return {};
  });

  // For Dom feedback: whether each interest rating is applicable.
  const [interestApplicable, setInterestApplicable] = useState(() => {
    if (role === 'Dom' && targetInterests && targetInterests.length > 0) {
      const init = {};
      targetInterests.forEach((interest) => {
        const key = getInterestKey(interest);
        init[key] = true;
      });
      return init;
    }
    return {};
  });

  const [honestyScore, setHonestyScore] = useState(5);
  const [comment, setComment] = useState('');

  // Handlers for general ratings.
  const handleGeneralRatingChange = (field, value) => {
    setGeneralRatings((prev) => ({ ...prev, [field]: Number(value) }));
  };

  // Handlers for interest ratings.
  const handleInterestRatingChange = (interestKey, value) => {
    setInterestRatings((prev) => ({ ...prev, [interestKey]: Number(value) }));
  };

  // Handler for badge gifting adjustments.
  const handleBadgeGiftingChange = (interestKey, delta) => {
    setBadgeGifting((prev) => {
      const newVal = prev[interestKey] + delta;
      if (newVal < 0 || newVal > 5) return prev;
      return { ...prev, [interestKey]: newVal };
    });
  };

  const toggleInterestApplicable = (interestKey) => {
    setInterestApplicable((prev) => ({
      ...prev,
      [interestKey]: !prev[interestKey]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload.
    const payload = {
      jobId,
      fromUser,
      toUser,
      generalRatings,
      honestyScore,
      comment
    };

    if (role === 'Dom' && targetInterests && targetInterests.length > 0) {
      const ir = {};
      targetInterests.forEach((interest) => {
        const key = getInterestKey(interest);
        ir[key] = interestApplicable[key] ? interestRatings[key] : null;
      });
      payload.interestRatings = ir;
      payload.badgeGifting = badgeGifting;
    }

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

      {role === 'Dom' && targetInterests && targetInterests.length > 0 && (
        <>
          <h4>Interest-Based Ratings & Badge Gifting (0-5)</h4>
          {targetInterests.map((interest) => {
            const key = getInterestKey(interest);
            const name = getInterestName(interest);
            return (
              <div key={key} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '0.5rem' }}>
                <h5>{name}</h5>
                <label>
                  Applicable:{' '}
                  <input
                    type="checkbox"
                    checked={interestApplicable[key]}
                    onChange={() => toggleInterestApplicable(key)}
                  />
                  (Uncheck if not applicable)
                </label>
                {interestApplicable[key] && (
                  <>
                    <div>
                      <label>
                        Rating (0-5):{' '}
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={interestRatings[key]}
                          onChange={(e) => handleInterestRatingChange(key, e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <p>Gift Badges (0-5):</p>
                      <button type="button" onClick={() => handleBadgeGiftingChange(key, -1)}>-</button>
                      <span style={{ margin: '0 10px' }}>{badgeGifting[key]}</span>
                      <button type="button" onClick={() => handleBadgeGiftingChange(key, 1)}>+</button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
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
