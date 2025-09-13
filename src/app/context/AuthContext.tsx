'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuth } from '@/lib/auth';

type AuthContextType = {
  authenticated: boolean;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  refreshAuth: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  const refreshAuth = async () => {
    const result = await getAuth();
    setAuthenticated(result);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
