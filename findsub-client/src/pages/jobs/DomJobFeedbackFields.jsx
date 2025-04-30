// src/pages/jobs/DomJobFeedbackFields.jsx

function DomFeedbackFields({ setGeneralRatings, setInterestRatings, setBadgeGifting, requiredKinks }) {
  const handleRatingChange = (field, value, setter) => {
    setter(prev => ({ ...prev, [field]: Number(value) }));
  };

  const kinkKey = (kink) => (typeof kink === 'string' ? kink : kink._id || '');
  const kinkName = (kink) => (typeof kink === 'string' ? kink : kink.name || 'Unknown Kink');

  const handleBadgeChange = (key, value) => {
    setBadgeGifting(prev => {
      const updated = { ...prev };
      if (!value || isNaN(value)) {
        delete updated[key];
      } else {
        const num = Number(value);
        if (num >= 1 && num <= 3) updated[key] = num;
        else delete updated[key];
      }
      return updated;
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">General Performance Ratings</h3>
      {[
        'Obedience',
        'Punctuality',
        'Cleanliness',
        'Respectfulness',
        'Work Ethic',
        'Attention to Detail'
      ].map(label => (
        <div key={label} className="mb-2">
          <label className="block mb-1">{label}:</label>
          <input
            type="number"
            min={1}
            max={5}
            onChange={e => handleRatingChange(label, e.target.value, setGeneralRatings)}
            required
            className="border px-2 py-1 w-20"
          />
        </div>
      ))}

      <h3 className="text-lg font-semibold mt-6 mb-2">Kink-Based Feedback</h3>
      {requiredKinks && requiredKinks.length > 0 ? (
        requiredKinks.map(kink => {
          const key = kinkKey(kink);
          const name = kinkName(kink);
          return (
            <div key={key} className="border p-4 mb-4 rounded">
              <label className="block mb-1">{name} Performance (1–5):</label>
              <input
                type="number"
                min={1}
                max={5}
                required
                onChange={e => handleRatingChange(key, e.target.value, setInterestRatings)}
                className="border px-2 py-1 w-20"
              />

              <label className="block mt-2 mb-1">{name} Badge (optional, 1–3):</label>
              <input
                type="number"
                min={1}
                max={3}
                placeholder="Leave blank to skip"
                onChange={e => handleBadgeChange(key, e.target.value)}
                className="border px-2 py-1 w-20"
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
