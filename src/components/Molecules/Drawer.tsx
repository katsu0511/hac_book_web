'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { handleLogout } from '@/lib/api/auth';
import { DisclosurePanel, DisclosureButton } from '@headlessui/react';
import DrawerButton from '@/components/Atoms/DrawerButton';
import Image from 'next/image';

export default function Drawer({ isTesting = false }: { isTesting?: boolean }) {
  const { profile, refreshAuth, router } = useAuthState();

  const logout = async () => await handleLogout(refreshAuth, router);

  return (
    <DisclosurePanel static={isTesting} className='bg-white w-full border-b border-[color:var(--color-primary)] z-50 shadow-md'>
      <nav className='flex flex-col gap-4 p-4'>
        <DrawerButton link='' display='Home' />
        <DrawerButton link='categories' display='Category' />
        <DrawerButton link='transactions' display='Transaction' />
        <DrawerButton link='summary' display='Summary' />
        <Image className='mx-auto mt-4 mb-0' src={profile ? `/${profile.user.icon}` : '/default.png'} width={32} height={32} alt='User'/>
        <DrawerButton link='profile' display='Profile' />
        <DrawerButton link='setting' display='Setting' />
        <DisclosureButton onClick={logout} className='mt-10 bg-[color:var(--color-primary)] text-white font-bold text-center rounded-sm cursor-pointer duration-300 hover:bg-white hover:text-[color:var(--color-primary)]'>Logout</DisclosureButton>
      </nav>
    </DisclosurePanel>
  );
}
