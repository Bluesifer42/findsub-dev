// src/dashboards/Switch/index.jsx

import { useUser } from '../../hooks/useUser';

function DashboardSwitch() {
  const { user, isLoading, isSwitch } = useUser();

  if (isLoading || !user) return <p>Loading dashboard...</p>;
  if (!isSwitch) return <p>Access denied. Switch only.</p>;

  return <h2>Welcome Switch: {user.username}</h2>;
}

export default DashboardSwitch;
