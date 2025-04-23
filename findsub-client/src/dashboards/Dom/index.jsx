// src/dashboards/Dom/index.jsx


import { useUser } from '../../hooks/useUser';

function DashboardDom() {
  const { user, isLoading, isDom } = useUser();

  if (isLoading || !user) return <p>Loading dashboard...</p>;
  if (!isDom) return <p>Access denied. Dom only.</p>;

  return <h2>Welcome Dom: {user.username}</h2>;
}

export default DashboardDom;
