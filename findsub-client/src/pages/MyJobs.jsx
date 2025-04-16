import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// You can import FeedbackForm if needed for further operations
// import FeedbackForm from './FeedbackForm';

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
      // Use _id or id
      const userId = parsed._id || parsed.id;
      if (!userId) {
        setStatus('User id not found.');
        return;
      }
      fetch(`http://localhost:5000/api/my-jobs/${userId}`)
        .then(res => res.json())
        .then(data => setJobs(data.jobs || []))
        .catch(() => setStatus('❌ Could not load jobs'));
    }
  }, []);

  const handleFeedbackClick = (job) => {
    setSelectedFeedbackJob(job);
  };

  // Optional: if you decide to add a "Retract Interest" button, create a handler here.
  // const handleRetractInterest = async (jobId) => { ... }

  return (
    <div>
      <h2>My Accepted Jobs</h2>
      {status && <p>{status}</p>}
      {jobs.length === 0 ? (
        <p>No accepted jobs yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>
              <Link to={`/job/${job._id}`}>{job.title}</Link>
            </h3>
            <p>
              <strong>Posted by:</strong>{' '}
              <Link to={`/profile/${job.posterId._id}`}>{job.posterId.username}</Link>
            </p>
            <p>{job.description}</p>
            {/* Here, you might also display a note if the sub has already applied
                and/or a button to retract interest if desired. */}
            {/* Example placeholder: */}
            {job.alreadyApplied ? (
              <div>
                <p>You have already expressed interest.</p>
                {/* <button onClick={() => handleRetractInterest(job._id)}>Retract Interest</button> */}
              </div>
            ) : (
              <button onClick={() => handleFeedbackClick(job)}>Leave Feedback</button>
            )}
          </div>
        ))
      )}

      {/* Render Feedback Form if a job is selected */}
      {selectedFeedbackJob && (
        <div style={{ padding: '1rem', border: '2px solid #444', marginTop: '1rem' }}>
          <h3>Provide Feedback for: {selectedFeedbackJob.title}</h3>
          {/* Render your FeedbackForm component here; adjust props as needed */}
          {/* <FeedbackForm jobId={selectedFeedbackJob._id} fromUser={user.id} toUser={selectedFeedbackJob.posterId._id} role={user.role} targetInterests={selectedFeedbackJob.posterId.interests || []} /> */}
          <button onClick={() => setSelectedFeedbackJob(null)} style={{ marginTop: '1rem' }}>
            Close Feedback Form
          </button>
        </div>
      )}
    </div>
  );
}

export default MyJobs;
