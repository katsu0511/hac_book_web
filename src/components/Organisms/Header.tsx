'use client';

import Link from 'next/link';
import LogoutButton from '../Atoms/LogoutButton';
import { useAuth } from '@/app/context/AuthContext';

export default function Header() {
  const { authenticated } = useAuth();

  return (
    <header className='bg-blue-500 w-full h-10'>
      <div className='flex justify-between max-w-screen-xl w-full h-full px-4 mx-auto'>
        {authenticated
          ? <Link href='/' className='text-white text-3xl font-bold leading-10 duration-300 hover:opacity-60'>Hac Book</Link>
          : <h1 className='text-white text-3xl font-bold leading-10'>Hac Book</h1>
        }
        {authenticated && <LogoutButton />}
      </div>
    </header>
  );
}
