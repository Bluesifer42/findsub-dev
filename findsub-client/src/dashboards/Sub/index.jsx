// src/dashboards/Sub/index.jsx

import { useUser } from '../../hooks/useUser';

function DashboardSub() {
  const { user, isLoading, isSub } = useUser();

  if (isLoading || !user) return <p>Loading dashboard...</p>;
  if (!isSub) return <p>Access denied. Sub only.</p>;

  return <h2>Welcome Sub: {user.username}</h2>;
}

export default DashboardSub;
