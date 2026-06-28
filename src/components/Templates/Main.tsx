'use client';

import { usePathname } from 'next/navigation';

const needItemsCenter = ['/login', '/signup', '/profile/name', '/profile/email', '/profile/password', '/setting/saving-goal']

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const classes = [
    needItemsCenter.includes(pathname) && 'flex items-center',
    'w-full',
    'min-h-[calc(100dvh-80px)]',
    'bg-orange-50',
  ].filter(Boolean).join(' ');

  return (
    <main className={classes}>
      <div className='w-full h-full md:max-w-screen-md xl:max-w-screen-xl px-4 mx-auto'>
        {children}
      </div>
    </main>
  );
}
