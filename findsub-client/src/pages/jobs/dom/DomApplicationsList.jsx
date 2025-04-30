// File: /src/pages/jobs/dom/DomApplicationsList.jsx
// Purpose: Display all jobs the current Dom has posted that have pending applications
// Standards:
// - Uses camelCase
// - Fully annotated
// - Uses centralized API utils from /utils/api.js
// - Includes console logging for lifecycle and debug
// - Uses toast for user feedback
// - Role-locked for Dom users

import { useEffect, useState } from 'react';
import { useUser } from "../../../hooks/useUser";
import { useNavigate, Link } from 'react-router-dom';
import { getJobsByPoster } from '../../../utils/api';
import toast from 'react-hot-toast';

function DomApplicationsList() {
  const { user, isAuthenticated, isLoading } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'Dom') return;

    console.log('[DomApplicationsList] Fetching jobs for poster:', user._id);

    (async () => {
      try {
        const { jobs } = await getJobsByPoster(user._id);
        const jobsWithApplicants = jobs.filter(job => job.status === 'open');

        console.log(`[DomApplicationsList] Jobs with open status:`, jobsWithApplicants);

        setJobs(jobsWithApplicants);
      } catch (err) {
        console.error('[DomApplicationsList] Failed to fetch jobs:', err);
        toast.error('❌ Failed to load your listings');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (isLoading || loading) return <p>Loading your job applications...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Jobs With Applications</h2>

      {jobs.length === 0 ? (
        <p>No current job listings with applications.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map(job => (
            <li key={job._id} className="border p-4 rounded shadow-sm">
              <h3 className="text-xl font-semibold">
                <Link to={`/job/${job._id}`}>{job.title}</Link>
              </h3>
              <p>{job.description?.substring(0, 100)}...</p>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <button
                className="mt-2 underline text-blue-600"
                onClick={() => navigate(`/job/${job._id}`)}
              >
                View Applications
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DomApplicationsList;
