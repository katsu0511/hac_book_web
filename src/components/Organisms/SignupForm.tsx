'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { useForm } from 'react-hook-form';
import { handleSignup } from '@/lib/api/auth';
import Form from '@/components/Organisms/Form';
import FormElement from '../Molecules/FormElement';
import SubmitButton from '../Molecules/SubmitButton';
import LinkElement from '../Molecules/LinkElement';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

export default function SignupForm() {
  const { loadingState, setLoadingState, error, setError, refreshAuth, router } = useAuthState();
  const { control, handleSubmit } = useForm<AuthFormData>({ defaultValues });

  const signup = async(data: AuthFormData) => {
    setLoadingState(true);
    await handleSignup(data.name, data.email, data.password, data.passwordConfirm, setError, refreshAuth, router);
    setLoadingState(false);
  };

  return (
    <Form onSubmit={handleSubmit(signup)}>
      <FormElement name='name' label='Name' type='text' control={control} autoComplete='name' />
      <FormElement name='email' label='Email' type='email' control={control} autoComplete='email' />
      <FormElement name='password' label='Password' type='password' control={control} autoComplete='current-password' />
      <FormElement name='passwordConfirm' label='Password Confirmation' type='password' control={control} autoComplete='new-password' />
      <SubmitButton label='Signup' error={error} loading={loadingState} />
      <LinkElement page='login' />
    </Form>
  );
}
