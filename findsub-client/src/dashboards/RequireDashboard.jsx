// /src/dashboards/RequireDashboard.jsx

import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function RequireDashboard() {
  const { user, isLoading } = useUser();

  if (isLoading) return <p className="text-center mt-4">Loading dashboard...</p>;
  if (!user) return <Navigate to="/login" />;

  if (user.isAdmin) return <Navigate to="/dashboard/admin" />;
  if (user.role === 'Dom') return <Navigate to="/dashboard/dom" />;
  if (user.role === 'Sub') return <Navigate to="/dashboard/sub" />;
  if (user.role === 'Switch') return <Navigate to="/dashboard/switch" />;

  return <p>Unknown role: access denied.</p>;
}

export default RequireDashboard;
