import { useEffect, useState } from 'react';
import Jobs from './Jobs';
import JobPost from './JobPost';
import JobManager from './JobManager';
import MyJobs from './MyJobs';
import JobHistory from './JobHistory'; // This one should exist now

function JobsHub() {
  const [tab, setTab] = useState('board');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) return <p>Please log in to access jobs.</p>;

  const isDom = user.role === 'Dom';
  const isSub = user.role === 'Sub';
  const isSwitch = user.role === 'Switch';

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
        {showTab('board', 'Jobs Board')}
        {showTab('history', 'Job History')}

        {(isDom || isSwitch) && (
          <>
            {showTab('manage', 'Manage Jobs')}
            {showTab('post', 'Post Job')}
          </>
        )}

        {(isSub || isSwitch) && showTab('my', 'Active Jobs')}
      </div>

      {/* Render active tab content */}
      {tab === 'board' && <Jobs />}
      {tab === 'post' && <JobPost />}
      {tab === 'manage' && <JobManager />}
      {tab === 'my' && <MyJobs />}
      {tab === 'history' && <JobHistory />}
    </div>
  );
}

export default JobsHub;
