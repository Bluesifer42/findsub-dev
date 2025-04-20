import { useEffect, useState } from 'react';

function AdminDevTools() {
  const [status, setStatus] = useState('');
  const [subs, setSubs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedSub, setSelectedSub] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  
  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users')
      .then(res => res.json())
      .then(data => {
        const onlySubs = data.users.filter(u => u.role === 'Sub');
        setSubs(onlySubs);
        if (onlySubs.length) setSelectedSub(onlySubs[0]._id);
      });
  
    fetch('http://localhost:5000/api/jobs?view=all') // ensure server supports ?view=all or remove it
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs || []);
        if (data.jobs?.length) setSelectedJob(data.jobs[0]._id);
      });
  }, []);
  
  // 🧪 Test User creation form state
  const [form, setForm] = useState({
    username: '',
    role: 'Sub',
    isAdmin: false
  });

  // 🧍 Doms for job creation dropdown
  const [doms, setDoms] = useState([]);
  const [selectedDom, setSelectedDom] = useState('');

  // 📥 Fetch all Dom users on load
  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users')
      .then(res => res.json())
      .then(data => {
        const onlyDoms = data.users.filter(u => u.role === 'Dom');
        setDoms(onlyDoms);
        if (onlyDoms.length > 0) setSelectedDom(onlyDoms[0]._id);
      });
  }, []);

  // 🧾 Handle all form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 🧪 Create a test user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setStatus('Creating user...');

    const res = await fetch('http://localhost:5000/api/admin/create-test-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username,
        role: form.role,
        isAdmin: form.isAdmin
      })
    });

    const data = await res.json();
    if (res.ok) {
      setStatus(`✅ Created user: ${data.user.username} (${data.user.email})`);
      setForm({ username: '', role: 'Sub', isAdmin: false });
    } else {
      setStatus(`❌ ${data.message}`);
    }
  };

  // 📦 Create a test job for selected Dom
  const handleCreateJob = async (e) => {
    e.preventDefault();
    setStatus('Creating test job...');

    const res = await fetch('http://localhost:5000/api/admin/create-test-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domId: selectedDom })
    });

    const data = await res.json();
    if (res.ok) {
      setStatus(`✅ Created job "${data.job.title}" for Dom ID: ${selectedDom}`);
    } else {
      setStatus(`❌ ${data.message}`);
    }
  };

  // 🔥 Purge collections
  const handlePurge = async (type) => {
    const confirm = window.confirm(`Really purge all ${type}? This cannot be undone.`);
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/api/admin/purge/${type}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (res.ok) {
      setStatus(`✅ Purged ${type}: ${data.result.deletedCount} item(s)`);
    } else {
      setStatus(`❌ ${data.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>🧪 Admin DevTools</h2>

      {/* 📝 Status Message */}
      {status && (
        <p style={{ marginBottom: '1rem', color: status.startsWith('✅') ? 'green' : 'red' }}>
          {status}
        </p>
      )}

<hr style={{ margin: '2rem 0' }} />
<h3>📝 Generate Test Application</h3>

{subs.length === 0 || jobs.length === 0 ? (
  <p>⚠️ Requires at least one Sub and one Job.</p>
) : (
  <form onSubmit={async (e) => {
    e.preventDefault();
    setStatus('Submitting test application...');

    const res = await fetch('http://localhost:5000/api/admin/create-test-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        applicantId: selectedSub,
        jobId: selectedJob
      })
    });


    {/* 👤 Create Test Application */}
    const data = await res.json();
    if (res.ok) {
      setStatus(`✅ Test application created by ${selectedSub} for job ${selectedJob}`);
    } else {
      setStatus(`❌ ${data.message}`);
    }
  }}>
    <label>
      Sub:
      <select value={selectedSub} onChange={(e) => setSelectedSub(e.target.value)} style={{ marginLeft: '0.5rem' }}>
        {subs.map(sub => (
          <option key={sub._id} value={sub._id}>{sub.username}</option>
        ))}
      </select>
    </label>
    <br /><br />
    <label>
      Job:
      <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} style={{ marginLeft: '0.5rem' }}>
        {jobs.map(job => (
          <option key={job._id} value={job._id}>{job.title}</option>
        ))}
      </select>
    </label>
    <br /><br />
    <button type="submit">Generate Application</button>
  </form>
)}


      {/* 👤 Create Test User */}
      <form onSubmit={handleCreateUser}>
        <h3>Create Test User</h3>

        <input
          type="text"
          name="username"
          placeholder="TestUsername"
          value={form.username}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        >
          <option value="Sub">Sub</option>
          <option value="Dom">Dom</option>
          <option value="Switch">Switch</option>
        </select>

        <label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={form.isAdmin}
            onChange={handleChange}
          />{' '}
          Make Admin
        </label>

        <br /><br />
        <button type="submit">Create Test User</button>
      </form>

      {/* ➖ Divider */}
      <hr style={{ margin: '2rem 0' }} />

      {/* 🛠️ Create Test Job */}
      <h3>Create Test Job</h3>

      {doms.length === 0 ? (
        <p>⚠️ No Doms found. Create one above first.</p>
      ) : (
        <form onSubmit={handleCreateJob}>
          <label>
            Post job as Dom:
            <select
              value={selectedDom}
              onChange={(e) => setSelectedDom(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            >
              {doms.map(dom => (
                <option key={dom._id} value={dom._id}>{dom.username}</option>
              ))}
            </select>
          </label>
          <br /><br />
          <button type="submit">Generate Test Job</button>
        </form>
      )}

      {/* ➖ Divider */}
      <hr style={{ margin: '2rem 0' }} />

      {/* ⚠️ Purge Data */}
      <h3>⚠️ Purge Data</h3>
      <p style={{ fontSize: '0.9rem' }}>These actions are destructive. Use with caution!</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {['users', 'jobs', 'applications', 'feedback'].map(type => (
          <button
            key={type}
            style={{ padding: '0.5rem 1rem' }}
            onClick={() => handlePurge(type)}
          >
            Purge {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminDevTools;
