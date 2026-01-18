'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { handleGetAuth } from '@/lib/api/auth';

type AuthContextType = {
  authenticated: boolean
  loading: boolean
  refreshAuth: () => Promise<void>
};

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  loading: true,
  refreshAuth: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    setLoading(true);
    try {
      const result = await handleGetAuth();
      setAuthenticated(result);
    } catch(e) {
      console.log(e);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, loading, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
