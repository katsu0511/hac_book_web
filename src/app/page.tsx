'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { getAuth } from '@/lib/auth';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const authenticated = await getAuth();
    if (!authenticated) router.replace('/login');
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <h2>Hello World!</h2>
      <Link href={'/categories'}>Category</Link>
    </div>
  );
}
