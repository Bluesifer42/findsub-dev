// File: src/pages/SubAcceptedJobs.jsx
// Purpose: Displays jobs accepted by the current sub (status = filled or completed).
// Standards:
// - Uses camelCase
// - Fully annotated code
// - Uses toast not alert()
// - Returns raw data
// - Defensive async handling
// - Console logs prefixed
// - Role guard logic enabled

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFilledJobs } from '../../../utils/api';
import { toast } from 'react-toastify';

function SubAcceptedJobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      console.warn('⚠️ [SubAcceptedJobs] No user in localStorage');
      return;
    }

    const parsed = JSON.parse(stored);
    setUser(parsed);

    (async () => {
      try {
        const { jobs: filledJobs } = await getFilledJobs(parsed._id);
        console.log('[SubAcceptedJobs] Fetched filled jobs:', filledJobs);

        const active = filledJobs.filter(job =>
          job.status === 'filled' ||
          (job.status === 'completed' && job.subFeedbackLeft === false)
        );

        setJobs(active);
      } catch (err) {
        console.error('❌ [SubAcceptedJobs] Error fetching filled jobs:', err);
        setStatus('❌ Failed to load your jobs.');
        toast.error('Failed to load accepted jobs');
      }
    })();
  }, []);

  const handleFeedback = (jobId, toUserId) => {
    navigate(`/feedback/${jobId}/${toUserId}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Active Jobs</h2>

      {status && <p className="text-red-600">{status}</p>}

      {jobs.length === 0 ? (
        <p>No active jobs at the moment.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} className="border p-4 mb-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold">
              <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline">
                {job.title}
              </Link>
            </h3>
            <p><strong>Posted By:</strong> {job.posterId?.username || 'Unknown'}</p>
            <p><strong>Status:</strong> {job.status}</p>

            {job.status === 'completed' && !job.subFeedbackLeft ? (
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => handleFeedback(job._id, job.posterId?._id)}
              >
                Leave Feedback
              </button>
            ) : job.status === 'completed' && job.subFeedbackLeft ? (
              <p className="text-green-600"><em>✅ Feedback Submitted</em></p>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

export default SubAcceptedJobs;
