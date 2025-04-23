import { useState } from 'react';
import Jobs from './Jobs';
import DomJobListings from './DomJobListings';
import DomActiveJobs from './DomActiveJobs';
import SubAcceptedJobs from './SubAcceptedJobs';
import DomJobHistory from './DomJobHistory';
import SubJobHistory from './SubJobHistory';
import DomJobPost from './DomJobPost';
import { useUser } from '../hooks/useUser';

function JobsHub() {
  const { user, isLoading, isDom, isSub } = useUser();
  const [activeTab, setActiveTab] = useState('board');

  if (isLoading) return <p>Loading user...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jobs Portal</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setActiveTab('board')} className="px-3 py-1 bg-gray-200 rounded">
          Job Board
        </button>
        <button onClick={() => setActiveTab('active')} className="px-3 py-1 bg-gray-200 rounded">
          Active Jobs
        </button>
        <button onClick={() => setActiveTab('history')} className="px-3 py-1 bg-gray-200 rounded">
          Job History
        </button>
        {isDom && (
          <>
            <button onClick={() => setActiveTab('listings')} className="px-3 py-1 bg-gray-200 rounded">
              My Listings
            </button>
            <button onClick={() => setActiveTab('post')} className="px-3 py-1 bg-gray-200 rounded">
              Post Job
            </button>
          </>
        )}
      </div>

      {activeTab === 'board' && <Jobs />}
      {activeTab === 'active' && (isDom ? <DomActiveJobs /> : isSub ? <SubAcceptedJobs /> : null)}
      {activeTab === 'history' && (isDom ? <DomJobHistory /> : isSub ? <SubJobHistory /> : null)}
      {activeTab === 'listings' && isDom && <DomJobListings />}
      {activeTab === 'post' && isDom && <DomJobPost />}
    </div>
  );
}

export default JobsHub;
