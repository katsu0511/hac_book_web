'use client';

import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) router.replace('/login');
  }, [authenticated, router]);

  return (
    <div>
      <h2>Hello World!</h2>
      <div>
        <Link href={'/categories'}>Category</Link>
      </div>
      <div>
        <Link href={'/transactions'}>Transaction</Link>
      </div>
    </div>
  );
}
