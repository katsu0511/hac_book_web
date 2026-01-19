'use client';

import { ReactNode, useEffect } from 'react';
import useAuthState from '@/lib/hooks/useAuthState';

export function AuthRedirectToLogin({ children }: { children: ReactNode }) {
  const { authenticated, loading, router } = useAuthState();

  useEffect(() => {
    if (!loading && !authenticated) return router.replace('/login');
  }, [authenticated, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return null;

  return <>{children}</>;
}

export function AuthRedirectToHome({ children }: { children: ReactNode }) {
  const { authenticated, loading, router } = useAuthState();

  useEffect(() => {
    if (!loading && authenticated) return router.replace('/');
  }, [authenticated, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (authenticated) return null;

  return <>{children}</>;
}
