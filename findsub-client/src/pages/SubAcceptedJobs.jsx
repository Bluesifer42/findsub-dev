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
        const activeJobs = data.jobs.filter(job =>
          (
            job.status === 'filled' ||
            (job.status === 'completed' && job.subFeedbackLeft === false)
          )
        );
        setJobs(activeJobs);
      })
      .catch(() => setStatus('❌ Failed to load your jobs.'));
  }, []);

  const handleFeedback = (jobId, toUserId) => {
    navigate(`/feedback/${jobId}/${toUserId}`);
  };

  return (
    <div>
      <h2>Your Active Jobs</h2>
      {status && <p>{status}</p>}
      {jobs.length === 0 ? (
        <p>No active jobs at the moment.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3><Link to={`/job/${job._id}`}>{job.title}</Link></h3>
            <p><strong>Posted By:</strong> {job.posterId?.username}</p>
            <p><strong>Status:</strong> {job.status}</p>

            {job.status === 'completed' && job.subFeedbackLeft === false ? (
              <button onClick={() => handleFeedback(job._id, job.posterId._id)}>
                Leave Feedback
              </button>
            ) : job.status === 'completed' && job.subFeedbackLeft === true ? (
              <p><em>✅ Feedback Submitted</em></p>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}

export default SubAcceptedJobs;
