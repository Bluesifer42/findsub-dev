// src/pages/DomJobListings.jsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { getJobsByPoster } from '../utils/api';

function DomJobListings() {
  const { user, isDom, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isDom)) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, isDom, navigate]);

  useEffect(() => {
    if (!user || !isDom) return;

    (async () => {
      try {
        const { jobs: all } = await getJobsByPoster(user._id || user.id);
        const unfilled = (all || []).filter(job =>
          job.status === 'open' && !job.selectedApplicant
        );
        setJobs(unfilled);
      } catch (err) {
        console.error('Failed to load listings.');
      }
    })();
  }, [user, isDom]);

  if (isLoading || !user) return <p className="text-center mt-4">Loading your listings...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Unfilled Listings</h2>

      {jobs.length === 0 ? (
        <p>You don’t have any open, unfilled jobs right now.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} className="border p-4 mb-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold">
              <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline">
                {job.title}
              </Link>
            </h3>
            <p>{job.description}</p>
            <button onClick={() => navigate(`/jobs/edit/${job._id}`)} className="mt-2 text-sm">
              ✏️ Edit Job
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DomJobListings;
