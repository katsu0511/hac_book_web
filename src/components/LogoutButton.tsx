'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const logout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!res.ok) {
        router.replace('/');
        return;
      };

      await refreshAuth();
      router.replace('/login');
    } catch (error) {
      console.log(error instanceof Error ? error.message : 'unknown error');
    }
  }

  return <button className='block bg-blue-500 text-white h-10 w-20 duration-300 hover:bg-white hover:text-blue-500 cursor-pointer' onClick={logout}>Logout</button>;
}
