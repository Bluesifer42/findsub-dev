// src/pages/AdminDevTools.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getUsers,
  getAllJobs,
  createTestUser,
  createTestJob,
  createTestApplication,
  purgeType
} from '../utils/api';
import { useUser } from '../hooks/useUser';

function AdminDevTools() {
  const { user, isAdmin, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  const [status, setStatus] = useState('');
  const [subs, setSubs] = useState([]);
  const [doms, setDoms] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedSub, setSelectedSub] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedDom, setSelectedDom] = useState('');
  const [form, setForm] = useState({ username: '', role: 'Sub', isAdmin: false });

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) return navigate('/login');
      if (!isAdmin) {
        alert('Access denied. Admins only.');
        return navigate('/');
      }
    }
  }, [isLoading, isAdmin, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) return;

    (async () => {
      try {
        const { users } = await getUsers();
        const onlySubs = users.filter(u => u.role === 'Sub');
        const onlyDoms = users.filter(u => u.role === 'Dom');
        setSubs(onlySubs);
        setDoms(onlyDoms);
        if (onlySubs.length) setSelectedSub(onlySubs[0]._id);
        if (onlyDoms.length) setSelectedDom(onlyDoms[0]._id);
      } catch (err) {
        setStatus('❌ Failed to fetch users');
        console.error(err);
      }

      try {
        const { jobs } = await getAllJobs();
        setJobs(jobs || []);
        if (jobs?.length) setSelectedJob(jobs[0]._id);
      } catch (err) {
        setStatus('❌ Failed to fetch jobs');
        console.error(err);
      }
    })();
  }, [isAuthenticated, isAdmin]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setStatus('Creating user...');
    try {
      const { user } = await createTestUser(form);
      setStatus(`✅ Created user: ${user.username} (${user.email})`);
      setForm({ username: '', role: 'Sub', isAdmin: false });
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setStatus('Creating test job...');
    try {
      const { job } = await createTestJob(selectedDom);
      setStatus(`✅ Created job "${job.title}" for Dom ID: ${selectedDom}`);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  const handleTestApplication = async (e) => {
    e.preventDefault();
    setStatus('Submitting test application...');
    try {
      await createTestApplication(selectedSub, selectedJob);
      setStatus(`✅ Test application created by ${selectedSub} for job ${selectedJob}`);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  const handlePurge = async (type) => {
    if (!window.confirm(`Really purge all ${type}? This cannot be undone.`)) return;
    try {
      const { result } = await purgeType(type);
      setStatus(`✅ Purged ${type}: ${result.deletedCount} item(s)`);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  if (isLoading || !user) return <p className="text-center mt-4">Loading dev tools...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">🧪 Admin DevTools</h2>

      {status && (
        <p className={`mb-4 ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}

      {/* ... remainder of UI unchanged ... */}
    </div>
  );
}

export default AdminDevTools;
