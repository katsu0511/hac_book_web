'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { handleGetAuth } from '@/lib/api/auth';

type AuthContextType = {
  authenticated: boolean
  authLoading: boolean
  profile: Profile | null
  refreshAuth: () => Promise<void>
};

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  authLoading: true,
  profile: null,
  refreshAuth: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshAuth = async () => {
    setAuthLoading(true);
    try {
      const result = await handleGetAuth();
      if (result == null) setAuthenticated(false)
      else setAuthenticated(true);
      setProfile(result);
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
    <AuthContext.Provider value={{ authenticated, authLoading, profile, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
