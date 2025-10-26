'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from '../Molecules/Button';
import PageLink from '../Molecules/PageLink';
import { useAuth } from '@/app/context/AuthContext';
import { signup } from '@/lib/actions';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const { authenticated, loading, refreshAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (authenticated) router.replace('/');
  }, [authenticated, loading, router]);

  const handleSignup = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !passwordConfirm) {
      setError('input your name, email and password');
      return;
    } else if (password !== passwordConfirm) {
      setError('password doesn\'t match');
      return;
    }

    const res = await signup(name, email, password);
    if (typeof res === 'string') {
      setError(res);
      return;
    }
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
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={handleSignup}>
        <Input label='Name' type='text' value={name} autoComplete='name' onChange={(e) => setName(e.target.value)}/>
        <Input label='Email' type='text' value={email} autoComplete='email' onChange={(e) => setEmail(e.target.value)} />
        <Input label='Password' type='password' value={password} autoComplete='new-password' onChange={(e) => setPassword(e.target.value)}/>
        <Input label='Password Confirmation' type='password' value={passwordConfirm} autoComplete='new-password' onChange={(e) => setPasswordConfirm(e.target.value)}/>
        <Button usage='Signup' error={error} />
        <PageLink usage='login' />
      </form>
    </div>
  );
}
