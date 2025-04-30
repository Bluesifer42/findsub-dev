// File: src/pages/jobs/Jobs.jsx
// Purpose: Display the public job board with available jobs, with the ability to apply or view feedback.
// Standards:
// - Uses camelCase
// - Fully annotated code
// - Uses toast for user messages (not alert/prompt)
// - Returns raw data from backend
// - Full error handling and logging
// - Defensive array checks before map()
// - Auth data via UserContext

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
import { getAllJobs, getFeedbackForJob, applyToJob } from '../../utils/api';
import { toast } from 'react-toastify';

function Jobs() {
  const { user, isLoading } = useUser();

  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const [feedbackMap, setFeedbackMap] = useState({});
  const [visibleFeedbackJobIds, setVisibleFeedbackJobIds] = useState([]);

  // Fetch all jobs on mount
  useEffect(() => {
    (async () => {
      try {
        const { jobs: fetchedJobs } = await getAllJobs(); // ✅ expect { jobs: [...] }
        console.log('[Jobs.jsx] ✅ Jobs fetched:', fetchedJobs);
        setJobs(Array.isArray(fetchedJobs) ? fetchedJobs : []);
      } catch (err) {
        console.error('[Jobs.jsx] ❌ Failed to fetch jobs:', err);
        setStatus('❌ Failed to load jobs.');
        toast.error('Failed to load jobs.');
      }
    })();
  }, []);

  // Show/hide feedback for a specific job
  const toggleFeedback = async (jobId) => {
    const isVisible = visibleFeedbackJobIds.includes(jobId);

    // Fetch feedback only if not already fetched
    if (!isVisible && !feedbackMap[jobId]) {
      try {
        const { feedback } = await getFeedbackForJob(jobId);
        setFeedbackMap(prev => ({ ...prev, [jobId]: feedback }));
      } catch (err) {
        console.error('[Jobs.jsx] ❌ Feedback fetch error:', err);
        toast.error('Could not load feedback.');
      }
    }

    // Toggle visibility
    setVisibleFeedbackJobIds(prev =>
      isVisible ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  // Apply to job
  const handleApply = async (jobId) => {
    try {
      const cover = prompt('Optional: Add a message (or leave blank):');
      if (cover === null) return; // Cancelled

      await applyToJob({
        jobId,
        applicantId: user._id || user.id,
        coverLetter: cover.trim(),
      });

      toast.success('✅ Application submitted!');
    } catch (err) {
      console.error('[Jobs.jsx] ❌ Apply error:', err);
      toast.error(err.message || 'Failed to apply.');
    }
  };

  if (isLoading) return <p>Loading jobs...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
      {status && <p className="text-red-600">{status}</p>}
      {Array.isArray(jobs) && jobs.length === 0 && !status && (
        <p>No jobs currently posted.</p>
      )}

      {Array.isArray(jobs) ? (
        jobs.map(job => (
          <div key={job._id} className="border p-4 mb-6 rounded shadow-sm">
            <h3 className="text-lg font-semibold mb-1">
              <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline">
                {job.title}
              </Link>
            </h3>

            <p><strong>Posted by:</strong> <Link to={`/profile/${job.posterId._id}`}>{job.posterId.username}</Link></p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Compensation:</strong> {job.compensation}</p>
            {job.requirements && <p><strong>Requirements:</strong> {job.requirements}</p>}
            {job.duration && <p><strong>Duration:</strong> {job.duration}</p>}
            {job.category && <p><strong>Category:</strong> {job.category}</p>}
            {job.expiresAt && <p><strong>Expires:</strong> {new Date(job.expiresAt).toLocaleDateString()}</p>}

            {job.isFilled && (
              <>
                <p className="text-green-600 mt-2">
                  ✅ Filled by: {job.selectedApplicant?.username || 'Unknown'}
                </p>

                <button onClick={() => toggleFeedback(job._id)} className="mt-2 underline text-sm">
                  {visibleFeedbackJobIds.includes(job._id) ? '🔽 Hide Feedback' : '🔍 Show Feedback'}
                </button>

                {visibleFeedbackJobIds.includes(job._id) && feedbackMap[job._id] && (
                  <div className="bg-gray-900 text-white p-4 mt-2 rounded">
                    <h4 className="font-semibold">Feedback:</h4>
                    {feedbackMap[job._id].length === 0 ? (
                      <p>No feedback submitted yet.</p>
                    ) : (
                      feedbackMap[job._id].map(f => (
                        <div key={f._id} className="border-b border-gray-700 py-2">
                          <p><strong>From:</strong> {f.fromUser.username} ({f.fromUser.role})</p>

                          {f.generalRatings && (
                            <>
                              <p><strong>General Ratings:</strong></p>
                              <ul>
                                {Object.entries(f.generalRatings).map(([k, v]) => (
                                  <li key={k}>{k}: {v}/5</li>
                                ))}
                              </ul>
                            </>
                          )}

                          {f.interestRatings && (
                            <>
                              <p><strong>Interest Ratings:</strong></p>
                              <ul>
                                {Object.entries(f.interestRatings).map(([k, v]) => (
                                  <li key={k}>{k}: {v || 'N/A'}</li>
                                ))}
                              </ul>
                            </>
                          )}

                          {f.badgeGifting && (
                            <>
                              <p><strong>Badges Gifted:</strong></p>
                              <ul>
                                {Object.entries(f.badgeGifting).map(([k, v]) => (
                                  <li key={k}>{k}: {v}</li>
                                ))}
                              </ul>
                            </>
                          )}

                          <p><strong>Honesty Score:</strong> {f.honestyScore} / 5</p>
                          {f.comment && <p><strong>Comment:</strong> {f.comment}</p>}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}

            {user && (user.role === 'Sub' || user.role === 'Switch') && !job.isFilled && (
              <button
                onClick={() => handleApply(job._id)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Apply / Express Interest
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-red-600 mt-4">⚠️ Could not load jobs. Please try again later.</p>
      )}
    </div>
  );
}

export default Jobs;
