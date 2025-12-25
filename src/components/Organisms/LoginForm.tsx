'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { useForm } from 'react-hook-form';
import { handleLogin } from '@/lib/api/auth';
import Form from '@/components/Organisms/Form';
import AuthFormElement from '../Molecules/AuthFormElement';
import SubmitButton from '../Molecules/SubmitButton';
import LinkElement from '../Molecules/LinkElement';

const defaultValues = {
  email: '',
  password: ''
};

export default function LoginForm() {
  const { loadingState, setLoadingState, error, setError, refreshAuth, router } = useAuthState();
  const { control, handleSubmit } = useForm<AuthFormData>({ defaultValues });

  const login = async (data: AuthFormData) => {
    setLoadingState(true);
    await handleLogin(data.email, data.password, setError, refreshAuth, router);
    setLoadingState(false);
  };

  return (
    <Form onSubmit={handleSubmit(login)}>
      <AuthFormElement name='email' label='Email' type='email' control={control} autoComplete='email' />
      <AuthFormElement name='password' label='Password' type='password' control={control} autoComplete='current-password' />
      <SubmitButton label='Login' error={error} loading={loadingState} />
      <LinkElement page='signup' display='Signup' />
    </Form>
  );
}
