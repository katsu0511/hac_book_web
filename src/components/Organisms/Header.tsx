'use client';

import { Satisfy } from 'next/font/google';
import useAuthState from '@/lib/hooks/useAuthState';
import { handleLogout } from '@/lib/api/auth';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from '../Atoms/LogoutButton';

const satisfy = Satisfy({
  weight: '400',
  subsets: ['latin'],
});

export default function Header() {
  const { authenticated, refreshAuth, router } = useAuthState();

  const logout = async () => {
    await handleLogout(refreshAuth, router);
  }

  return (
    <header className='bg-[color:var(--color-primary)] w-full h-10'>
      <div className='flex justify-between w-full h-full md:max-w-screen-md xl:max-w-screen-xl px-4 mx-auto'>
        {authenticated
          ? <Link href='/' className='flex text-white text-3xl font-bold leading-10 duration-300 hover:opacity-60'>
              <Image src="/books.png" alt="Books" width={40} height={40} />
              <p className={`${satisfy.className} ml-4`}>Hac Book</p>
            </Link>
          : <h1 className='flex text-white text-3xl font-bold leading-10'>
              <Image src="/books.png" alt="Books" width={40} height={40} />
              <p className={`${satisfy.className} ml-4`}>Hac Book</p>
            </h1>
        }
        {authenticated && <LogoutButton logout={logout} />}
      </div>
    </header>
  );
}
