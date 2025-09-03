'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { getAuth } from '@/lib/auth';
import Input from './Input';
import Button from './Button';
import PageLink from './PageLink';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const authenticated = await getAuth();
    if (authenticated) router.replace('/');
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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

      router.replace('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'unknown error');
    }
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={login}>
        <Input label='Email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button usage='Login' error={error} />
        <PageLink usage='signup' />
      </form>
    </div>
  );
}
