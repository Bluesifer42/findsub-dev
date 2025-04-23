// src/pages/DomActiveJobs.jsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { getJobsByPoster } from '../utils/api';

function DomActiveJobs() {
  const { user, isDom, isLoading, isAuthenticated } = useUser();
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isDom)) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, isDom, navigate]);

  useEffect(() => {
    if (!user || !isDom) return;

    (async () => {
      try {
        const { jobs: allJobs } = await getJobsByPoster(user._id || user.id);
        const active = allJobs.filter(job =>
          job.selectedApplicant &&
          job.posterId._id === (user._id || user.id) &&
          (
            (job.status === 'filled' && !job.completedOn) ||
            (job.status === 'completed' && job.domFeedbackLeft === false)
          )
        );
        setJobs(active);
      } catch (err) {
        setStatus('❌ Failed to load active jobs.');
      }
    })();
  }, [user, isDom]);

  const handleLeaveFeedback = (job) => {
    navigate(`/feedback/${job._id}/${job.selectedApplicant._id}`);
  };

  if (isLoading || !user) return <p className="text-center mt-4">Loading active jobs...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Active Jobs (Sub Selected or Awaiting Feedback)</h2>
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
            <p>{job.description}</p>
            <p><strong>Selected Sub:</strong> {job.selectedApplicant?.username}</p>
            <p><strong>Status:</strong> {job.status}</p>

            {job.status === 'completed' && job.domFeedbackLeft === false ? (
              <button onClick={() => handleLeaveFeedback(job)}>Leave Feedback</button>
            ) : job.status === 'completed' && job.domFeedbackLeft === true ? (
              <p><em>✅ Feedback Submitted</em></p>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

export default DomActiveJobs;
