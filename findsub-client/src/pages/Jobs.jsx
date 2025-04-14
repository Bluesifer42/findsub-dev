import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [feedbackMap, setFeedbackMap] = useState({});
  const [visibleFeedbackJobIds, setVisibleFeedbackJobIds] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs))
      .catch((err) => {
        console.error(err);
        setStatus('❌ Failed to load jobs.');
      });
  }, []);

  const toggleFeedback = async (jobId) => {
    const isVisible = visibleFeedbackJobIds.includes(jobId);

    if (!isVisible) {
      if (!feedbackMap[jobId]) {
        const res = await fetch(`http://localhost:5000/api/feedback/job/${jobId}`);
        const data = await res.json();
        setFeedbackMap((prev) => ({ ...prev, [jobId]: data.feedback }));
      }
      setVisibleFeedbackJobIds((prev) => [...prev, jobId]);
    } else {
      setVisibleFeedbackJobIds((prev) => prev.filter(id => id !== jobId));
    }
  };

  return (
    <div>
      <h2>Available Jobs</h2>
      {status && <p>{status}</p>}
      {jobs.length === 0 && !status && <p>No jobs currently posted.</p>}

      {jobs.map((job) => (
        <div key={job._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <h3><Link to={`/job/${job._id}`}>{job.title}</Link></h3>
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
              <p style={{ color: 'green' }}>
                ✅ Role filled by: <strong>{job.selectedApplicant?.username || 'Unknown'}</strong>
              </p>

              <button onClick={() => toggleFeedback(job._id)}>
                {visibleFeedbackJobIds.includes(job._id) ? '🔽 Hide Feedback' : '🔍 Show Feedback'}
              </button>

              {visibleFeedbackJobIds.includes(job._id) && feedbackMap[job._id] && (
                <div style={{ marginTop: '0.5rem', background: '#222', padding: '1rem', borderRadius: '6px', color: '#eee' }}>
                  <h4>Feedback:</h4>
                  {feedbackMap[job._id].length === 0 ? (
                    <p>No feedback submitted yet.</p>
                  ) : (
                    feedbackMap[job._id].map(f => (
                      <div key={f._id} style={{ borderBottom: '1px solid #444', padding: '0.5rem 0' }}>
                        <p><strong>From:</strong> {f.fromUser.username} ({f.fromUser.role})</p>
                        {f.generalRatings && (
                          <>
                            <p><strong>General Ratings:</strong></p>
                            <ul>
                              {Object.entries(f.generalRatings).map(([key, value]) => (
                                <li key={key}>{key}: {value} / 5</li>
                              ))}
                            </ul>
                          </>
                        )}
                        {f.interestRatings && (
                          <>
                            <p><strong>Interest Ratings:</strong></p>
                            <ul>
                              {Array.from(Object.entries(f.interestRatings)).map(([key, value]) => (
                                <li key={key}>{key}: {value !== null ? `${value} / 5` : 'N/A'}</li>
                              ))}
                            </ul>
                          </>
                        )}
                        {f.badgeGifting && (
                          <>
                            <p><strong>Badges Gifted:</strong></p>
                            <ul>
                              {Array.from(Object.entries(f.badgeGifting)).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
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
            <button onClick={async () => {
              const confirmed = window.confirm('Do you want to apply for this job?');
              if (!confirmed) return;

              const cover = prompt('Optional: Add a message (or leave blank):');
              if (cover === null) {
                alert('❌ Application cancelled.');
                return;
              }

              const res = await fetch('http://localhost:5000/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  jobId: job._id,
                  applicantId: user.id,
                  coverLetter: cover.trim()
                })
              });

              const data = await res.json();

              if (res.ok) {
                alert('✅ Application submitted!');
              } else {
                alert(`❌ ${data.message}`);
              }
            }}>
              Apply / Express Interest
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Jobs;
