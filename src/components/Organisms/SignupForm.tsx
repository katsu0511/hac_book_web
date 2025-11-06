'use client';

import { useEffect } from 'react';
import Input from '../Molecules/FormElement';
import Button from '../Molecules/SubmitButton';
import PageLink from '../Molecules/LinkElement';
import useAuthState from '@/lib/hooks/useAuthState';
import { handleSignup } from '@/lib/api/auth';

export default function SignupForm() {
  const { name, setName, email, setEmail, password, setPassword, passwordConfirm, setPasswordConfirm, error, setError, authenticated, loading, refreshAuth, router } = useAuthState();

  useEffect(() => {
    if (loading) return;
    if (authenticated) router.replace('/');
  }, [authenticated, loading, router]);

  const signup = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignup(name, email, password, passwordConfirm, setError, refreshAuth, router);
  };

  return (
    <div className='flex items-center w-full h-full'>
      <form className='w-full' onSubmit={signup}>
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
