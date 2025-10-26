'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from '../Molecules/Button';
import PageLink from '../Molecules/PageLink';
import { useAuth } from '@/app/context/AuthContext';
import { login } from '@/lib/actions';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { authenticated, loading, refreshAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (authenticated) router.replace('/');
  }, [authenticated, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('input your email and password');
      return;
    }

    const res = await login(email, password);
    if (typeof res === 'string') {
      setError(res);
      return;
    }
    if (!res.ok) {
      const json = await res.json();
      if (json.loginFailed) setError(json.loginFailed);
      return;
    };

    await refreshAuth();
    router.replace('/');
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={handleLogin}>
        <Input label='Email' type='text' value={email} autoComplete='email' onChange={(e) => setEmail(e.target.value)} />
        <Input label='Password' type='password' value={password} autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
        <Button usage='Login' error={error} />
        <PageLink usage='signup' />
      </form>
    </div>
  );
}
