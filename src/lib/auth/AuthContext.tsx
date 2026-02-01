'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { handleGetAuth } from '@/lib/api/auth';

type AuthContextType = {
  authenticated: boolean
  authLoading: boolean
  refreshAuth: () => Promise<void>
};

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  authLoading: true,
  refreshAuth: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshAuth = async () => {
    setAuthLoading(true);
    try {
      const result = await handleGetAuth();
      setAuthenticated(result);
    } catch(e) {
      console.log(e);
      setAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, authLoading, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
