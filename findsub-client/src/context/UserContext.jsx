// /src/context/UserContext.jsx

import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      console.log('📦 [UserContext] Loaded user from localStorage:', JSON.parse(stored));
      setUser(JSON.parse(stored));
    } else {
      console.log('🕳 [UserContext] No user found in localStorage');
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
