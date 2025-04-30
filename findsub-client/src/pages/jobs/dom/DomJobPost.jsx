// src/pages/DomJobPost.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useUser } from '../../../hooks/useUser';
import { getAllKinks, createJob } from '../../../utils/api';

function DomJobPost() {
  const { user, isDom, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    compensation: '',
    requirements: '',
    category: '',
    expiresAt: '',
    startDate: '',
    startTime: '',
    minDuration: '',
    requiredKinks: []
  });
  const [kinksOptions, setKinksOptions] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isDom)) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, isDom, navigate]);

  useEffect(() => {
    const fetchKinks = async () => {
      try {
        const kinkData = await getAllKinks();
        if (Array.isArray(kinkData)) {
          setKinksOptions(
            kinkData.map(k => ({
              value: k._id,
              label: k.name,
              description: k.description
            }))
          );
        } else {
          console.warn('⚠️ getAllKinks did not return an array:', kinkData);
          setKinksOptions([]);
        }
      } catch (err) {
        console.error('Error fetching kinks:', err);
        setStatus('Error fetching kinks');
        setKinksOptions([]);
      }
    };
  
    fetchKinks();
  }, []);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKinksChange = (selected) => {
    setFormData(prev => ({
      ...prev,
      requiredKinks: selected ? selected.map(s => s.value) : []
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return setStatus('User not logged in.');

    try {
      const payload = { ...formData, posterId: user._id || user.id };
      const res = await createJob(payload);
      setStatus('✅ Job posted successfully.');
      navigate('/jobs');
    } catch (err) {
      console.error('Job post error:', err);
      setStatus(`❌ ${err.message || 'Server error. Please try again.'}`);
    }
  };

  if (isLoading || !user) return <p className="text-center mt-4">Loading job form...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      {status && <p className="mb-4">{status}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ['Title', 'title'],
          ['Description', 'description', true],
          ['Location', 'location'],
          ['Compensation', 'compensation'],
          ['Requirements', 'requirements', true],
          ['Expires At', 'expiresAt', false, 'date'],
          ['Start Date', 'startDate', false, 'date'],
          ['Start Time', 'startTime', false, 'time'],
          ['Minimum Duration', 'minDuration']
        ].map(([label, name, isTextarea, type]) => (
          <label key={name} className="block">
            {label}:<br />
            {isTextarea ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border p-2"
              />
            ) : (
              <input
                type={type || 'text'}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border p-2"
              />
            )}
          </label>
        ))}

        {/* Category Dropdown */}
        <label className="block">
          Category:<br />
          <select
            name="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            required
            className="w-full border p-2"
          >
            <option value="">Select Category</option>
            {[
              'Domestic Servitude',
              'Footwear Cleaning',
              'Worship Sessions',
              'Meal Prep Service',
              'Other'
            ].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        {/* Required Kinks Dropdown */}
        <label className="block">
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

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Post Job
        </button>
      </form>
    </div>
  );
}

export default DomJobPost;
