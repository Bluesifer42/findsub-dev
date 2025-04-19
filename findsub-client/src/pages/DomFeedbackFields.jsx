import React from 'react';

function DomFeedbackFields({ setGeneralRatings, setInterestRatings, setBadgeGifting, requiredKinks }) {
  const handleRatingChange = (field, value, setter) => {
    setter(prev => ({ ...prev, [field]: Number(value) }));
  };

  const kinkKey = (kink) => {
    if (typeof kink === 'string') return kink;
    if (kink._id) return kink._id;
    return '';
  };

  const kinkName = (kink) => {
    if (typeof kink === 'string') return kink;
    if (kink.name) return kink.name;
    return 'Unknown Kink';
  };

  return (
    <div>
      <h3>General Performance Ratings</h3>
      {[
        'Obedience',
        'Punctuality',
        'Cleanliness',
        'Respectfulness',
        'Work Ethic',
        'Attention to Detail'
      ].map(label => (
        <div key={label}>
          <label>{label}:</label>
          <input
            type="number"
            min={1}
            max={5}
            onChange={e => handleRatingChange(label, e.target.value, setGeneralRatings)}
            required
          />
        </div>
      ))}

      <h3>Kink-Based Feedback</h3>
      {requiredKinks && requiredKinks.length > 0 ? (
        requiredKinks.map(kink => {
          const key = kinkKey(kink);
          const name = kinkName(kink);
          return (
            <div key={key} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '8px' }}>
              <label>{name} Performance (1–5):</label>
              <input
                type="number"
                min={1}
                max={5}
                onChange={e => handleRatingChange(key, e.target.value, setInterestRatings)}
                required
              />

<label style={{ marginLeft: '1rem' }}>{name} Badge (optional):</label>
<input
  type="number"
  min={1}
  max={3}
  placeholder="Leave blank to skip"
  onChange={e => {
    const value = e.target.value;
    setBadgeGifting(prev => {
      const updated = { ...prev };
      if (value === '' || value === null || value === undefined) {
        delete updated[key]; // remove it if cleared
      } else {
        const num = Number(value);
        if (num >= 1 && num <= 3) updated[key] = num;
        else delete updated[key]; // also remove if out of range
      }
      return updated;
    });
  }}
/>
            </div>
          );
        })
      ) : (
        <p>No required kinks listed for this job.</p>
      )}
    </div>
  );
}

export default DomFeedbackFields;
