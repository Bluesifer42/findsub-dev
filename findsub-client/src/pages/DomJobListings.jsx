import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DomJobListings() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) return;

    const parsed = JSON.parse(stored);
    setUser(parsed);

    const userId = parsed._id || parsed.id;
    if (!userId || parsed.role !== 'Dom') return;

    fetch(`http://localhost:5000/api/jobs?view=poster&posterId=${userId}`)
      .then(res => res.json())
      .then(data => {
        const unfilled = (data.jobs || []).filter(job =>
          job.status === 'open' &&
          !job.selectedApplicant
        );
        setJobs(unfilled);
      })
      .catch(() => console.error('Failed to load listings.'));
  }, []);

  return (
    <div>
      <h2>My Unfilled Listings</h2>
      {jobs.length === 0 ? (
        <p>You don’t have any open, unfilled jobs right now.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3><Link to={`/job/${job._id}`}>{job.title}</Link></h3>
            <p>{job.description}</p>
            <button onClick={() => navigate(`/jobs/edit/${job._id}`)}>✏️ Edit Job</button>
          </div>
        ))
      )}
    </div>
  );
}

export default DomJobListings;
