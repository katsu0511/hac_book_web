'use client';

import { Satisfy } from 'next/font/google';
import useAuthState from '@/lib/hooks/useAuthState';
import { useState } from 'react';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from '@/components/Atoms/LogoutButton';
import { X, Menu } from 'lucide-react';
import Drawer from '@/components/Molecules/Drawer';

const satisfy = Satisfy({
  weight: '400',
  subsets: ['latin'],
});

export default function Header({forceAuthenticated}: {forceAuthenticated?: boolean}) {
  // forceAuthenticated is set only by Storybook
  // otherwise get authenticated through useAuthState()
  const auth = useAuthState();
  const authenticated = forceAuthenticated ? forceAuthenticated : auth.authenticated;
  const { profile } = auth;
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Disclosure as='header' className='relative bg-white w-full h-10 border-b border-[color:var(--color-primary)]'>
      {({ open }) => (
        <>
          <div className='flex justify-between w-full h-full md:max-w-screen-md xl:max-w-screen-xl px-4 mx-auto'>
            {
              authenticated
              ? <Link href='/' className='flex text-[color:var(--color-primary)] text-3xl font-bold leading-10 duration-300 hover:opacity-60'>
                  <Image src='/books.png' width={40} height={39} alt='Books' />
                  <p className={`${satisfy.className} ml-4`}>Hac Book</p>
                </Link>
              : <h1 className='flex text-[color:var(--color-primary)] text-3xl font-bold leading-10'>
                  <Image src='/books.png' width={40} height={39} alt='Books' />
                  <p className={`${satisfy.className} ml-4`}>Hac Book</p>
                </h1>
            }

            {
              authenticated &&
              <nav className='hidden relative md:flex'>
                <div className='flex mr-5'>
                  <Link href='/categories' className='block bg-white text-[color:var(--color-primary)] font-bold w-auto h-full leading-[39px] px-2 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Category</Link>
                  <Link href='/transactions' className='block bg-white text-[color:var(--color-primary)] font-bold w-auto h-full leading-[39px] px-2 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Transaction</Link>
                  <Link href='/summary' className='block bg-white text-[color:var(--color-primary)] font-bold w-auto h-full leading-[39px] px-2 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Summary</Link>
                </div>
                <div className='w-8 h-8 pt-1'>
                  <Image
                    className='cursor-pointer duration-300 hover:opacity-60'
                    onClick={() => setOpenMenu(!openMenu)}
                    src={profile ? `/${profile.user.icon}` : '/default.png'}
                    width={32}
                    height={32}
                    alt='User'
                  />
                </div>
                {
                  openMenu &&
                  <div className='absolute bg-white top-10 right-0 w-50 h-30'>
                    <Link href='/profile' className='block text-[color:var(--color-primary)] font-bold text-center py-2 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white' onClick={() => setOpenMenu(false)}>Profile</Link>
                    <Link href='/setting' className='block text-[color:var(--color-primary)] font-bold text-center py-2 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white' onClick={() => setOpenMenu(false)}>Setting</Link>
                    <LogoutButton setOpenMenu={setOpenMenu} />
                  </div>
                }
              </nav>
            }

            {
              authenticated &&
              <DisclosureButton className='ml-auto cursor-pointer duration-300 hover:opacity-60 md:hidden'>
                {open ? <X size={30} /> : <Menu size={30} />}
              </DisclosureButton>
            }
          </div>

          <Drawer />
        </>
      )}
    </Disclosure>
  );
}
