'use client';

import Input from './Input';
import Button from '../Molecules/Button';
import PageLink from '../Molecules/PageLink';
import useAuthState from '@/lib/hooks/useAuthState';
import { useForm } from 'react-hook-form';
import { handleLogin } from '@/lib/api/auth';
import Form from '@/components/Organisms/Form';

const defaultValues = {
  email: '',
  password: ''
};

export default function LoginForm() {
  const { email, setEmail, password, setPassword, loadingState, setLoadingState, error, setError, refreshAuth, router } = useAuthState();
  const { control, handleSubmit } = useForm<AuthFormData>({ defaultValues });

  const login = async (data: AuthFormData) => {
    setLoadingState(true);
    await handleLogin(data.email, data.password, setError, refreshAuth, router);
    setLoadingState(false);
  };

  return (
    <Form onSubmit={handleSubmit(login)}>
      <Input label='Email' type='text' value={email} autoComplete='email' onChange={(e) => setEmail(e.target.value)} />
      <Input label='Password' type='password' value={password} autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
      <Button usage='Login' error={error} />
      <PageLink usage='signup' />
    </Form>
  );
}
