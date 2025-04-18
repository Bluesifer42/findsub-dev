import { useEffect, useState } from 'react';
import Jobs from './Jobs';
import DomJobListings from './DomJobListings';
import DomActiveJobs from './DomActiveJobs';
import SubAcceptedJobs from './SubAcceptedJobs';
import DomJobHistory from './DomJobHistory';
import SubJobHistory from './SubJobHistory';
import DomJobPost from './DomJobPost';

function JobsHub() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('board');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) return <p>Loading user...</p>;

  const isDom = user.role === 'Dom';
  const isSub = user.role === 'Sub';

  return (
    <div>
      <h1>Jobs Portal</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setActiveTab('board')}>Job Board</button>
        <button onClick={() => setActiveTab('active')}>Active Jobs</button>
        <button onClick={() => setActiveTab('history')}>Job History</button>
        {isDom && <button onClick={() => setActiveTab('listings')}>My Listings</button>}
        {isDom && <button onClick={() => setActiveTab('post')}>Post Job</button>}
      </div>

      {activeTab === 'board' && <Jobs />}
      {activeTab === 'active' && isDom && <DomActiveJobs />}
      {activeTab === 'active' && isSub && <SubAcceptedJobs />}
      {activeTab === 'history' && isDom && <DomJobHistory />}
      {activeTab === 'history' && isSub && <SubJobHistory />}
      {activeTab === 'listings' && isDom && <DomJobListings />}
      {activeTab === 'post' && isDom && <DomJobPost />}
    </div>
  );
}

export default JobsHub;
