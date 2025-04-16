// src/pages/JobsHub.jsx
import { useEffect, useState } from 'react';
import Jobs from './Jobs';
import JobPost from './JobPost';
import JobManager from './JobManager';        // Used for dom's "My Listing"
import MyJobs from './MyJobs';                // Active jobs for subs and doms
import AwaitingFeedback from './AwaitingFeedback';
import JobHistory from './JobHistory';

function JobsHub() {
  const [tab, setTab] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      // For doms, default to the "Post Job" tab; for subs, default to "Jobs Board".
      setTab(parsed.role === 'Dom' ? 'post' : 'board');
    }
  }, []);

  if (!user) return <p>Please log in to access jobs.</p>;

  const isDom = user.role === 'Dom';
  const isSub = user.role === 'Sub';
  const isSwitch = user.role === 'Switch';

  // Define tabs for doms and subs.
  const domTabs = [
    { key: 'post', label: 'Post Job' },
    { key: 'listing', label: 'My Listing' },
    { key: 'board', label: 'Jobs Board' },
    { key: 'active', label: 'Active Jobs' },
    { key: 'awaiting', label: 'Awaiting Feedback' },
    { key: 'history', label: 'Job History' }
  ];

  const subTabs = [
    { key: 'board', label: 'Jobs Board' },
    { key: 'active', label: 'Active Jobs' },
    { key: 'awaiting', label: 'Awaiting Feedback' },
    { key: 'history', label: 'Job History' }
  ];

  const tabs = isDom ? domTabs : subTabs;

  const showTab = (key, label) => (
    <button
      key={key}
      onClick={() => setTab(key)}
      style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
    >
      {label}
    </button>
  );

  return (
    <div>
      <h2>Jobs</h2>
      <div style={{ marginBottom: '1rem' }}>
        {tabs.map(tabObj => showTab(tabObj.key, tabObj.label))}
      </div>

      {/* Render active tab content based on the selected tab */}
      {isDom && tab === 'post' && <JobPost />}
      {isDom && tab === 'listing' && <JobManager />}
      {tab === 'board' && <Jobs />}
      {tab === 'active' && <MyJobs />}
      {tab === 'awaiting' && <AwaitingFeedback />}
      {tab === 'history' && <JobHistory />}
    </div>
  );
}

export default JobsHub;
