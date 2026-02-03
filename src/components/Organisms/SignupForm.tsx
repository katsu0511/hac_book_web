'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { useForm } from 'react-hook-form';
import { handleSignup } from '@/lib/api/auth';
import Form from '@/components/Organisms/Form';
import AuthFormElement from '../Molecules/AuthFormElement';
import SubmitButton from '../Molecules/SubmitButton';
import LinkElement from '../Molecules/LinkElement';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

export default function SignupForm() {
  const { buttonLoading, setButtonLoading, error, setError, refreshAuth, router } = useAuthState();
  const { control, handleSubmit } = useForm<AuthFormData>({ defaultValues });

  const signup = async(data: AuthFormData) => {
    setButtonLoading(true);
    await handleSignup(data.name, data.email, data.password, data.passwordConfirm, setError, refreshAuth, router);
    setButtonLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(signup)}>
      <AuthFormElement name='name' label='Name' type='text' control={control} autoComplete='name' />
      <AuthFormElement name='email' label='Email' type='email' control={control} autoComplete='email' />
      <AuthFormElement name='password' label='Password' type='password' control={control} autoComplete='current-password' />
      <AuthFormElement name='passwordConfirm' label='Password Confirmation' type='password' control={control} autoComplete='new-password' />
      <SubmitButton label='Signup' error={error} loading={buttonLoading} />
      <LinkElement page='login' display='Login' />
    </Form>
  );
}
