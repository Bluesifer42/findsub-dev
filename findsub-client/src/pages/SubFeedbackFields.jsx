import React from 'react';

function SubFeedbackFields({ setGeneralRatings }) {
  const handleRatingChange = (field, value) => {
    setGeneralRatings(prev => ({ ...prev, [field]: Number(value) }));
  };

  const domFeedbackFields = [
    'Strictness',
    'Communication',
    'Safety & Aftercare',
    'Fairness',
    'Task Clarity',
    'Environment'
  ];

  return (
    <div>
      <h3>Dom Behavior & Session Feedback</h3>
      {domFeedbackFields.map(label => (
        <div key={label}>
          <label>{label}:</label>
          <input
            type="number"
            min={1}
            max={5}
            onChange={e => handleRatingChange(label, e.target.value)}
            required
          />
        </div>
      ))}
    </div>
  );
}

export default SubFeedbackFields;
