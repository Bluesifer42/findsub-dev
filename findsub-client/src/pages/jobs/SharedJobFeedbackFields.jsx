function SharedFeedbackFields({ honestyScore, setHonestyScore, comment, setComment }) {
  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-1">Honesty Score</h3>
      <p className="text-sm text-gray-600 mb-2">How honest and transparent was this user?</p>
      <input
        type="number"
        min={1}
        max={5}
        value={honestyScore}
        onChange={e => setHonestyScore(Number(e.target.value))}
        required
        className="w-full border p-2 mb-4"
      />

      <h3 className="font-semibold text-lg mb-1">Comment</h3>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        rows={5}
        className="w-full border p-2"
        placeholder="Share your thoughts about this session..."
        required
      />
    </div>
  );
}

export default SharedFeedbackFields;
