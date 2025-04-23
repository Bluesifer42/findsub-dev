// src/pages/DomJobHistory.jsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { getDomJobHistory } from '../utils/api';

function DomJobHistory() {
  const { user, isDom, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isDom)) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, isDom, navigate]);

  useEffect(() => {
    if (!user || !isDom) return;

    (async () => {
      try {
        const { jobs: all } = await getDomJobHistory(user._id || user.id);
        const finished = (all || []).filter(job =>
          job.posterId._id === (user._id || user.id) &&
          ['completed', 'failed'].includes(job.status)
        );
        setJobs(finished);
      } catch (err) {
        setStatus('❌ Failed to load job history.');
      }
    })();
  }, [user, isDom]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading job history...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Job History (Posted by You)</h2>
      {status && <p className="text-red-600">{status}</p>}

      {jobs.length === 0 ? (
        <p>No completed or failed jobs yet.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} className="border p-4 mb-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold">
              <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline">
                {job.title}
              </Link>
            </h3>
            <p>{job.description}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Selected Sub:</strong> {job.selectedApplicant?.username || 'N/A'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DomJobHistory;
