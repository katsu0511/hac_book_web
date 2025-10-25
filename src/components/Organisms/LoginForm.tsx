'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from '../Molecules/Button';
import PageLink from '../Molecules/PageLink';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { authenticated, refreshAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authenticated) router.replace('/');
  }, [authenticated, router]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('input your email and password');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!res.ok) {
        const json = await res.json();
        if (json.loginFailed) setError(json.loginFailed);
        return;
      };

      await refreshAuth();
      router.replace('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'unknown error');
    }
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={login}>
        <Input label='Email' type='text' value={email} autoComplete='email' onChange={(e) => setEmail(e.target.value)} />
        <Input label='Password' type='password' value={password} autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
        <Button usage='Login' error={error} />
        <PageLink usage='signup' />
      </form>
    </div>
  );
}
