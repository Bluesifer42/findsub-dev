import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { getAllJobs, getFeedbackForJob, applyToJob } from '../utils/api';

function Jobs() {
  const { user, isAuthenticated, isLoading } = useUser();

  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const [feedbackMap, setFeedbackMap] = useState({});
  const [visibleFeedbackJobIds, setVisibleFeedbackJobIds] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { jobs } = await getAllJobs();
        setJobs(jobs);
      } catch {
        setStatus('❌ Failed to load jobs.');
      }
    })();
  }, []);

  const toggleFeedback = async (jobId) => {
    const isVisible = visibleFeedbackJobIds.includes(jobId);

    if (!isVisible && !feedbackMap[jobId]) {
      const { feedback } = await getFeedbackForJob(jobId);
      setFeedbackMap((prev) => ({ ...prev, [jobId]: feedback }));
    }

    setVisibleFeedbackJobIds((prev) =>
      isVisible ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApply = async (jobId) => {
    const confirmed = window.confirm('Do you want to apply for this job?');
    if (!confirmed) return;

    const cover = prompt('Optional: Add a message (or leave blank):');
    if (cover === null) return alert('Application cancelled.');

    try {
      await applyToJob({ jobId, applicantId: user.id, coverLetter: cover.trim() });
      alert('✅ Application submitted!');
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  if (isLoading) return <p>Loading jobs...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
      {status && <p>{status}</p>}
      {jobs.length === 0 && !status && <p>No jobs currently posted.</p>}

      {jobs.map(job => (
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
              <button onClick={() => toggleFeedback(job._id)} className="mt-2">
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
                            <ul>{Object.entries(f.generalRatings).map(([k, v]) => <li key={k}>{k}: {v}/5</li>)}</ul>
                          </>
                        )}

                        {f.interestRatings && (
                          <>
                            <p><strong>Interest Ratings:</strong></p>
                            <ul>{Object.entries(f.interestRatings).map(([k, v]) => <li key={k}>{k}: {v || 'N/A'}</li>)}</ul>
                          </>
                        )}

                        {f.badgeGifting && (
                          <>
                            <p><strong>Badges Gifted:</strong></p>
                            <ul>{Object.entries(f.badgeGifting).map(([k, v]) => <li key={k}>{k}: {v}</li>)}</ul>
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
            <button onClick={() => handleApply(job._id)} className="mt-4">
              Apply / Express Interest
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Jobs;
