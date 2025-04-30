// File: /src/pages/jobs/JobAwaitingFeedback.jsx
// Purpose: Show all jobs awaiting feedback from the currently logged-in user (Dom or Sub).
// Standards:
// - Uses camelCase
// - Console logging included for fetch debugging
// - Defensive auth redirect if user is not logged in
// - Centralized API call from /utils/api.js
// - Role-agnostic; supports both Dom and Sub

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJobsAwaitingFeedback } from '../../utils/api';
import { useUser } from '../../hooks/useUser';

function JobAwaitingFeedback() {
  const { user, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.warn('[JobAwaitingFeedback] User not authenticated, redirecting to login');
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        console.log('[JobAwaitingFeedback] Fetching jobs awaiting feedback for user:', user.id);
        const { jobs } = await getJobsAwaitingFeedback(user.id);
        setJobs(jobs || []);
        console.log('[JobAwaitingFeedback] Jobs received:', jobs);
      } catch (err) {
        console.error('[JobAwaitingFeedback] Error fetching jobs:', err);
        setStatus('Failed to load jobs awaiting feedback.');
      }
    })();
  }, [user]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading feedback queue...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Jobs Awaiting Feedback</h2>
      {status && <p className="text-red-600 mb-2">{status}</p>}

      {jobs.length === 0 ? (
        <p>No jobs awaiting feedback.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="border p-4 mb-4 rounded shadow-sm">
            <h3 className="font-semibold text-lg">
              <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline">
                {job.title}
              </Link>
            </h3>
            <p><strong>Status:</strong> {job.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default JobAwaitingFeedback;
