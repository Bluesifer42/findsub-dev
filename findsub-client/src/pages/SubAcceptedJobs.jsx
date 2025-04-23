import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SubAcceptedJobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;

    const parsed = JSON.parse(stored);
    setUser(parsed);

    fetch(`http://localhost:5000/api/my-jobs/${parsed._id}`)
      .then(res => res.json())
      .then(data => {
        const active = data.jobs.filter(job =>
          job.status === 'filled' || (job.status === 'completed' && job.subFeedbackLeft === false)
        );
        setJobs(active);
      })
      .catch(() => setStatus('❌ Failed to load your jobs.'));
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
            <p><strong>Posted By:</strong> {job.posterId?.username}</p>
            <p><strong>Status:</strong> {job.status}</p>

            {job.status === 'completed' && !job.subFeedbackLeft ? (
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => handleFeedback(job._id, job.posterId._id)}
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
