'use client';

import { getCurrentMonth } from '@/lib/domain/month';
import useAuthState from '@/lib/hooks/useAuthState';
import { useEffect } from 'react';
import Dashboard from '@/components/Organisms/Dashboard';

const month = getCurrentMonth();

export default function Home() {
  const { authenticated, loading, router } = useAuthState();

  useEffect(() => {
    if (!loading && !authenticated) router.replace('/login');
  }, [authenticated, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return null;

  return <Dashboard month={month} />;
}
