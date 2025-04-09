import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function MyJobs() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

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

  const sendFeedback = async (job) => {
    const rating = prompt('Give a rating from 1 (bad) to 5 (amazing):');
    const comment = prompt('Leave a comment (optional):');

    const res = await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId: job._id,
        fromUser: user.id,
        toUser: job.posterId._id,
        rating,
        comment
      })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>My Accepted Jobs</h2>
      {status && <p>{status}</p>}
      {jobs.length === 0 ? <p>No accepted jobs yet.</p> : (
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
            <button onClick={() => sendFeedback(job)}>Leave Feedback</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyJobs;
