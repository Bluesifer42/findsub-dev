// src/pages/Dashboard.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function Dashboard() {
  const { user, isLoading, isAuthenticated, isAdmin, isDom, isSub, isSwitch } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/login');
    } else if (isAdmin) {
      navigate('/admin');
    } else if (isDom) {
      navigate('/dashboard/dom');
    } else if (isSub) {
      navigate('/dashboard/sub');
    } else if (isSwitch) {
      navigate('/dashboard/switch');
    }
  }, [isLoading, isAuthenticated, isAdmin, isDom, isSub, isSwitch, navigate]);

  return <p className="text-center mt-4">Redirecting to your dashboard...</p>;
}

export default Dashboard;
