'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { handleGetAuth } from '@/lib/api/auth';

type AuthContextType = {
  authenticated: boolean
  refreshAuth: () => Promise<void>
};

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  refreshAuth: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  const refreshAuth = async () => {
    try {
      const result = await handleGetAuth();
      setAuthenticated(result);
    } catch(e) {
      console.log(e);
      setAuthenticated(false);
    }
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
