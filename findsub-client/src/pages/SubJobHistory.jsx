import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SubJobHistory() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;

    const parsed = JSON.parse(stored);
    setUser(parsed);

    const userId = parsed._id || parsed.id;
    if (!userId || parsed.role !== 'Sub') return;

    fetch(`http://localhost:5000/api/jobs/history/${userId}`)
      .then(res => res.json())
      .then(data => {
        const finishedJobs = (data.jobs || []).filter(job =>
          job.selectedApplicant?._id === userId &&
          ['completed', 'failed'].includes(job.status)
        );
        setJobs(finishedJobs);
      })
      .catch(() => setStatus('❌ Failed to load job history.'));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Completed Jobs</h2>
      {status && <p className="text-red-600">{status}</p>}

      {jobs.length === 0 ? (
        <p>You have no completed jobs yet.</p>
      ) : (
        jobs.map(job => (
          <div
            key={job._id}
            className="border p-4 mb-4 rounded shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold">
              <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline">
                {job.title}
              </Link>
            </h3>
            <p>{job.description}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Posted by:</strong> {job.posterId?.username || 'Unknown'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SubJobHistory;
