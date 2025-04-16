import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function JobPost() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    compensation: '',
    // Removed "duration" field.
    requirements: '',
    category: '', // Selected from dropdown.
    expiresAt: '',
    startDate: '',
    startTime: '',
    minDuration: '',
    requiredKinks: [] // Array of kink IDs.
  });
  const [kinksOptions, setKinksOptions] = useState([]);
  const [status, setStatus] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch current user from localStorage to get posterId.
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Fetch available kinks from backend.
  useEffect(() => {
    fetch('http://localhost:5000/api/kinks')
      .then(res => res.json())
      .then(data => {
        // Map each kink to an object for react-select.
        const options = data.kinks.map(kink => ({
          value: kink._id,
          label: kink.name,
          description: kink.description
        }));
        setKinksOptions(options);
      })
      .catch(err => {
        console.error('Error fetching kinks:', err);
        setStatus('Error fetching kinks');
      });
  }, []);

  // Generic handler for text inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for the kinks dropdown.
  const handleKinksChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      requiredKinks: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
  };

  // Handler for category dropdown.
  const handleCategoryChange = (e) => {
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };

  // Allowed category options.
  const categoryOptions = [
    { value: 'Domestic Servitude', label: 'Domestic Servitude' },
    { value: 'Footwear Cleaning', label: 'Footwear Cleaning' },
    { value: 'Worship Sessions', label: 'Worship Sessions' },
    { value: 'Meal Prep Service', label: 'Meal Prep Service' },
    { value: 'Other', label: 'Other' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setStatus('User not logged in.');
      return;
    }
    const jobData = {
      ...formData,
      posterId: user._id || user.id
    };

    // For debugging: log the jobData payload before sending.
    console.log('JobData to submit:', jobData);

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Job posted successfully.');
        navigate('/jobs');
      } else {
        setStatus(`Error: ${data.message}`);
        console.error('Error from server:', data);
      }
    } catch (error) {
      console.error('Job post error:', error);
      setStatus('Server error. Please try again.');
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:<br />
          <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required 
          />
        </label>
        <br />
        <label>
          Description:<br />
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            required 
          />
        </label>
        <br />
        <label>
          Location:<br />
          <input 
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Compensation:<br />
          <input 
            type="text"
            name="compensation"
            value={formData.compensation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Requirements:<br />
          <textarea 
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:<br />
          <select 
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Expires At:<br />
          <input 
            type="date"
            name="expiresAt"
            value={formData.expiresAt}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Start Date:<br />
          <input 
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required 
          />
        </label>
        <br />
        <label>
          Start Time:<br />
          <input 
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Minimum Duration:<br />
          <input 
            type="text"
            name="minDuration"
            value={formData.minDuration}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Required Kinks Dropdown */}
        <label>
          Required Kinks for Job:<br />
        </label>
        <Select
          options={kinksOptions}
          isMulti
          onChange={handleKinksChange}
          placeholder="Search and select required kinks..."
          formatOptionLabel={option => (
            <div>
              <strong>{option.label}</strong>
              {option.description && (
                <div style={{ fontSize: '0.8em', color: '#666' }}>{option.description}</div>
              )}
            </div>
          )}
        />
        <br />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default JobPost;
