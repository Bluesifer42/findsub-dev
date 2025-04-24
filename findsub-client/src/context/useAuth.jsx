// /src/context/useAuth.js

import { useContext } from 'react';
import { UserContext } from './UserContext';

export const useAuth = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    alert('👋 Logout function is running!');
    console.log('🚪 [Logout] Removing user and token...');
    console.log('📦 Token before removal:', localStorage.getItem('token'));

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);

    console.log('🧹 Token after removal:', localStorage.getItem('token'));

    // Force visual change
    document.body.style.backgroundColor = 'black';
  };

  return { user, setUser, logout };
};
