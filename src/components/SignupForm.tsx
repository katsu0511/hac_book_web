'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from './Button';
import PageLink from './PageLink';
import { useAuth } from '@/app/context/AuthContext';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const { authenticated, refreshAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authenticated) router.replace('/');
  }, [authenticated, router]);

  const signup = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !passwordConfirm) {
      setError('input your name, email and password');
      return;
    } else if (password !== passwordConfirm) {
      setError('password doesn\'t match');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });

      if (!res.ok) {
        const json = await res.json();
        let errors = '';
        if (json.email) errors += json.email;
        if (json.password) errors += `\n${json.password}`;
        if (json.signupFailed) errors += `\n${json.signupFailed}`;
        setError(errors);
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
      <form className='w-full' onSubmit={signup}>
        <Input label='Name' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
        <Input label='Email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Input label='Password Confirmation' type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
        <Button usage='Signup' error={error} />
        <PageLink usage='login' />
      </form>
    </div>
  );
}
