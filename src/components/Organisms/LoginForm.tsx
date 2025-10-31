'use client';

import { useEffect } from 'react';
import Input from './Input';
import Button from '../Molecules/Button';
import PageLink from '../Molecules/PageLink';
import useAuthState from '@/lib/hooks/useAuthState';
import { handleLogin } from '@/lib/api/auth';

export default function LoginForm() {
  const { email, setEmail, password, setPassword, error, setError, authenticated, loading, refreshAuth, router } = useAuthState();

  useEffect(() => {
    if (loading) return;
    if (authenticated) router.replace('/');
  }, [authenticated, loading, router]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password, setError, refreshAuth, router);
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
