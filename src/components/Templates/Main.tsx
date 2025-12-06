'use client';

import { usePathname } from 'next/navigation';

export default function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const classes = [
    isAuthPage && 'flex items-center',
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
