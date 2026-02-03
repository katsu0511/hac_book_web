'use client';

import { ReactNode, useEffect } from 'react';
import useAuthState from '@/lib/hooks/useAuthState';

export function AuthRedirectToLogin({ children }: { children: ReactNode }) {
  const { authenticated, authLoading, router } = useAuthState();

  useEffect(() => {
    if (!authLoading && !authenticated) return router.replace('/login');
  }, [authenticated, authLoading, router]);

  if (authLoading) return <div>Loading...</div>;
  if (!authenticated) return null;

  return <>{children}</>;
}

export function AuthRedirectToHome({ children }: { children: ReactNode }) {
  const { authenticated, authLoading, router } = useAuthState();

  useEffect(() => {
    if (!authLoading && authenticated) return router.replace('/');
  }, [authenticated, authLoading, router]);

  if (authLoading) return <div>Loading...</div>;
  if (authenticated) return null;

  return <>{children}</>;
}
