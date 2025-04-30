// File: src/pages/features/JobsHub.jsx
// Purpose: Main hub to navigate job sections by role, with standardized tab structure for Doms and Subs.
// Standards:
// - Uses camelCase
// - Returns raw data from backend
// - Defensive loading and role checks
// - Icon + label tab buttons for clarity
// - Supports in-tab JobDetail embedding

import { useState } from 'react';
import PublicJobsBoard from '../jobs/PublicJobsBoard';
import DomJobListings from '../jobs/dom/DomJobListings';
import DomActiveJobs from '../jobs/dom/DomActiveJobs';
import DomJobHistory from '../jobs/dom/DomJobHistory';
import DomJobPost from '../jobs/dom/DomJobPost';
import DomApplicationsList from '../jobs/dom/DomApplicationsList';
import SubAcceptedJobs from '../jobs/sub/SubAcceptedJobs';
import SubJobHistory from '../jobs/sub/SubJobHistory';
import JobDetail from '../jobs/JobDetail';
import { useUser } from '../../hooks/useUser';

function JobsHub() {
  const { user, isLoading, isDom, isSub } = useUser();
  const [activeTab, setActiveTab] = useState('board');
  const [selectedJobId, setSelectedJobId] = useState(null); // NEW: for embedded viewing

  if (isLoading) return <p>Loading user data...</p>;

  const domTabs = [
    { key: 'board', icon: '📋', label: 'All Jobs' },
    { key: 'listings', icon: '📝', label: 'My Listings' },
    { key: 'applications', icon: '📬', label: 'Applications' },
    { key: 'active', icon: '📌', label: 'Active Jobs' },
    { key: 'history', icon: '📉', label: 'Job History' },
    { key: 'post', icon: '➕', label: 'Post New Job' }
  ];

  const subTabs = [
    { key: 'board', icon: '📋', label: 'All Jobs' },
    { key: 'applications', icon: '📬', label: 'Applications' },
    { key: 'active', icon: '📌', label: 'Active Jobs' },
    { key: 'history', icon: '📉', label: 'Job History' }
  ];

  const tabsToRender = isDom ? domTabs : isSub ? subTabs : [];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jobs Portal</h1>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabsToRender.map(tab => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedJobId(null); // clear detail on tab change
            }}
            className={`px-3 py-1 rounded ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Embedded Job Detail if selected */}
      {selectedJobId && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <JobDetail jobId={selectedJobId} onClose={() => setSelectedJobId(null)} />
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'board' && <PublicJobsBoard onSelectJob={setSelectedJobId} />}
      {activeTab === 'listings' && isDom && <DomJobListings onSelectJob={setSelectedJobId} />}
      {activeTab === 'applications' && isDom && <DomApplicationsList onSelectJob={setSelectedJobId} />}
      {activeTab === 'applications' && isSub && <p>Sub view coming soon</p>}
      {activeTab === 'active' && (isDom ? <DomActiveJobs onSelectJob={setSelectedJobId} /> : isSub ? <SubAcceptedJobs onSelectJob={setSelectedJobId} /> : null)}
      {activeTab === 'history' && (isDom ? <DomJobHistory onSelectJob={setSelectedJobId} /> : isSub ? <SubJobHistory onSelectJob={setSelectedJobId} /> : null)}
      {activeTab === 'post' && isDom && <DomJobPost />}
    </div>
  );
}

export default JobsHub;
