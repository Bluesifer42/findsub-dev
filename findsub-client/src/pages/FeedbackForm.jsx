// src/pages/FeedbackForm.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DomFeedbackFields from './DomFeedbackFields';
import SubFeedbackFields from './SubFeedbackFields';
import SharedFeedbackFields from './SharedFeedbackFields';
import { useUser } from '../hooks/useUser';
import { getJobById, submitFeedback } from '../utils/api';

function FeedbackForm() {
  const { user, isAuthenticated, isLoading } = useUser();
  const { jobId, toUserId } = useParams();

  const [job, setJob] = useState(null);
  const [status, setStatus] = useState('');

  const [generalRatings, setGeneralRatings] = useState({});
  const [interestRatings, setInterestRatings] = useState({});
  const [badgeGifting, setBadgeGifting] = useState({});
  const [honestyScore, setHonestyScore] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { job } = await getJobById(jobId);
        setJob(job);
      } catch (err) {
        setStatus('❌ Failed to load job data.');
      }
    })();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setStatus('❌ You must be logged in.');

    const payload = {
      jobId,
      fromUser: user._id,
      toUser: toUserId,
      generalRatings,
      interestRatings,
      badgeGifting,
      honestyScore,
      comment
    };

    try {
      await submitFeedback(payload);
      setStatus('✅ Feedback submitted successfully.');
    } catch (err) {
      setStatus(`❌ ${err.message || 'Failed to submit feedback.'}`);
    }
  };

  if (isLoading || !user || !isAuthenticated) return <p>Loading user...</p>;
  if (!job) return <p>Loading job data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Leave Feedback</h2>
      {status && <p className="mb-4">{status}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {user.role === 'Dom' ? (
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

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
