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
      <h3 className="text-lg font-semibold mb-2">Dom Behavior & Session Feedback</h3>
      {domFeedbackFields.map(label => (
        <div key={label} className="mb-3">
          <label className="block mb-1">{label}:</label>
          <input
            type="number"
            min={1}
            max={5}
            onChange={e => handleRatingChange(label, e.target.value)}
            required
            className="border p-1 w-20"
          />
        </div>
      ))}
    </div>
  );
}

export default SubFeedbackFields;
