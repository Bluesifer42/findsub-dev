import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function JobPost() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    compensation: '',
    requirements: '',
    category: 'Other',
    expiresAt: '',
    startDate: '',
    startTime: '',
    minDuration: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      // If editing, fetch job details
      if (jobId) {
        fetch(`http://localhost:5000/api/jobs?view=poster&posterId=${parsed.id}`)
          .then(res => res.json())
          .then(data => {
            const job = data.jobs.find(j => j._id === jobId && j.status === 'cancelled');
            if (!job) return setStatus('❌ Job not found or not editable.');

            setIsEditing(true);
            setFormData({
              title: job.title || '',
              description: job.description || '',
              location: job.location || '',
              compensation: job.compensation || '',
              requirements: job.requirements || '',
              category: job.category || 'Other',
              expiresAt: job.expiresAt ? job.expiresAt.slice(0, 10) : '',
              startDate: job.startDate ? job.startDate.slice(0, 10) : '',
              startTime: job.startTime || '',
              minDuration: job.minDuration || ''
            });
          });
      }
    }
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      setStatus('❌ You must be logged in to post a job.');
      return;
    }

    const jobData = {
      ...formData,
      posterId: user.id
    };

    const endpoint = isEditing ? 'http://localhost:5000/api/jobs/update' : 'http://localhost:5000/api/jobs';
    const body = isEditing ? { ...jobData, jobId, newStatus: 'open' } : jobData;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(isEditing ? '✅ Job re-listed successfully!' : '✅ Job posted successfully!');
        if (!isEditing) {
          setFormData({
            title: '',
            description: '',
            location: '',
            compensation: '',
            requirements: '',
            category: 'Other',
            expiresAt: '',
            startDate: '',
            startTime: '',
            minDuration: ''
          });
        } else {
          navigate('/jobs'); // Redirect after re-listing
        }
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (error) {
      setStatus('❌ An error occurred while posting the job.');
      console.error(error);
    }
  };

  if (user === null) return <p>Loading...</p>;

  if (!user || (user.role !== 'Dom' && user.role !== 'Switch')) {
    return <p>Access denied. Only Doms or Switches can post jobs.</p>;
  }

  return (
    <div>
      <h2>{isEditing ? 'Edit & Re-List Job' : 'Post a Job'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" value={formData.title} required onChange={handleChange} /><br />
        <textarea name="description" placeholder="Describe the job..." value={formData.description} required onChange={handleChange} /><br />
        <input name="location" placeholder="Location (Online/City)" value={formData.location} onChange={handleChange} /><br />
        <input name="compensation" placeholder="Compensation (optional)" value={formData.compensation} onChange={handleChange} /><br />
        <input name="requirements" placeholder="Requirements (skills/experience)" value={formData.requirements} onChange={handleChange} /><br />

        <label>Category:</label><br />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Chauffeur">Chauffeur</option>
          <option value="Domestic Cleaning">Domestic Cleaning</option>
          <option value="Meal Prep and Service">Meal Prep and Service</option>
          <option value="Gardener">Gardener</option>
          <option value="Stable Slave">Stable Slave</option>
          <option value="Boot Licker">Boot Licker</option>
          <option value="Other">Other</option>
        </select><br /><br />

        <label>Start Date:</label><br />
        <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} /><br />

        <label>Start Time:</label><br />
        <input name="startTime" type="time" value={formData.startTime} onChange={handleChange} /><br />

        <label>Minimum Duration:</label><br />
        <input name="minDuration" placeholder="e.g. 2 hours" value={formData.minDuration} onChange={handleChange} /><br />

        <label>Expires At:</label><br />
        <input name="expiresAt" type="date" value={formData.expiresAt} onChange={handleChange} /><br />

        <button type="submit">{isEditing ? 'Re-List Job' : 'Post Job'}</button>
      </form>

      <p>{status}</p>
    </div>
  );
}

export default JobPost;
