import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';

function MyJobs() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');
  const [selectedFeedbackJob, setSelectedFeedbackJob] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      fetch(`http://localhost:5000/api/my-jobs/${parsed.id}`)
        .then(res => res.json())
        .then(data => setJobs(data.jobs))
        .catch(() => setStatus('❌ Could not load jobs'));
    }
  }, []);

  const handleFeedbackClick = (job) => {
    setSelectedFeedbackJob(job);
  };

  return (
    <div>
      <h2>My Accepted Jobs</h2>
      {status && <p>{status}</p>}
      {jobs.length === 0 ? (
        <p>No accepted jobs yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{job.title}</h3>
            <p>
              <strong>Posted by:</strong>{' '}
              <Link to={`/profile/${job.posterId._id}`}>
                {job.posterId.username}
              </Link>
            </p>
            <p>{job.description}</p>
            {!job.feedbackSubmitted ? (
              <button onClick={() => handleFeedbackClick(job)}>Leave Feedback</button>
            ) : (
              <p>Feedback submitted.</p>
            )}
          </div>
        ))
      )}

      {/* Render the feedback form modal if a job is selected */}
      {selectedFeedbackJob && (
        <div style={{ padding: '1rem', border: '2px solid #444', marginTop: '1rem' }}>
          <h3>Provide Feedback for: {selectedFeedbackJob.title}</h3>
          <FeedbackForm 
            jobId={selectedFeedbackJob._id}
            fromUser={user.id}
            toUser={selectedFeedbackJob.posterId._id}  // Assuming Subs leave feedback for Doms in this view
            role={user.role}
            // For targetInterests, you might need to pass in the interests of the counterpart
            targetInterests={selectedFeedbackJob.posterId.interests || []}
          />
          <button onClick={() => setSelectedFeedbackJob(null)} style={{ marginTop: '1rem' }}>
            Close Feedback Form
          </button>
        </div>
      )}
    </div>
  );
}

export default MyJobs;
