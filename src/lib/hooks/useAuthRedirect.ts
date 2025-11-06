'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { useEffect } from 'react';

export function useAuthRedirectToLogin() {
  const { authenticated, loading, router } = useAuthState();

  useEffect(() => {
    if (loading) return;
    if (authenticated) router.replace('/');
  }, [authenticated, loading, router]);
}
