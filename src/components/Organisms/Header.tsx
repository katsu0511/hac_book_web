'use client';

import { Satisfy } from 'next/font/google';
import useAuthState from '@/lib/hooks/useAuthState';
import { handleLogout } from '@/lib/api/auth';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from '@/components/Atoms/LogoutButton';
import { X, Menu } from 'lucide-react';

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
              <nav className='hidden md:flex'>
                <div className='flex mr-5'>
                  <Link href='/categories' className='block bg-white text-[color:var(--color-primary)] font-bold w-auto h-full leading-[39px] px-2 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Category</Link>
                  <Link href='/transactions' className='block bg-white text-[color:var(--color-primary)] font-bold w-auto h-full leading-[39px] px-2 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Transaction</Link>
                  <Link href='/summary' className='block bg-white text-[color:var(--color-primary)] font-bold w-auto h-full leading-[39px] px-2 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Summary</Link>
                </div>
                <LogoutButton />
              </nav>
            }

            {
              authenticated &&
              <DisclosureButton className='ml-auto cursor-pointer duration-300 hover:opacity-60 md:hidden'>
                {open ? <X size={30} /> : <Menu size={30} />}
              </DisclosureButton>
            }
          </div>

          <DisclosurePanel className='absolute top-full left-0 bg-white w-full border-b border-[color:var(--color-primary)] z-50 shadow-md md:hidden'>
            <nav className='flex flex-col gap-4 p-4'>
              <DisclosureButton as={Link} href='/' className='bg-white text-[color:var(--color-primary)] font-bold text-center rounded-sm cursor-pointer duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Home</DisclosureButton>
              <DisclosureButton as={Link} href='/categories' className='bg-white text-[color:var(--color-primary)] font-bold text-center rounded-sm cursor-pointer duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Category</DisclosureButton>
              <DisclosureButton as={Link} href='/transactions' className='bg-white text-[color:var(--color-primary)] font-bold text-center rounded-sm cursor-pointer duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Transaction</DisclosureButton>
              <DisclosureButton as={Link} href='/summary' className='bg-white text-[color:var(--color-primary)] font-bold text-center rounded-sm cursor-pointer duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>Summary</DisclosureButton>
              <DisclosureButton onClick={logout} className='mt-10 bg-[color:var(--color-primary)] text-white font-bold text-center rounded-sm cursor-pointer duration-300 hover:bg-white hover:text-[color:var(--color-primary)]'>Logout</DisclosureButton>
            </nav>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
