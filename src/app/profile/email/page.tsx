'use client';

import { useState } from 'react';
import useAuthState from '@/lib/hooks/useAuthState';
import { useForm, Controller } from 'react-hook-form';
import { changeUserEmail } from '@/lib/api/actions';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import Form from '@/components/Organisms/Form';
import CurrentInfo from '@/components/Atoms/CurrentInfo';
import { FormControl } from '@mui/material';
import Input from '@/components/Atoms/Input';
import SubmitButton from '@/components/Molecules/SubmitButton';
import LinkElement from '@/components/Molecules/LinkElement';
import ToastForChangeInfo from '@/components/Molecules/ToastForChangeInfo';

const defaultValues = { email: '' };

export default function EmailChangeForm() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [pendingData, setPendingData] = useState<User | null>(null);

  const { buttonLoading, setButtonLoading, error, setError, profile, refreshAuth, router } = useAuthState();
  const { control, handleSubmit } = useForm<User>({ defaultValues });

  const onSubmitPreCheck = (data: User) => {
    if (profile && data.email === profile.user.email) {
      setError('Input different email');
      return;
    }
    setPendingData(data);
    setDialogOpen(true);
  };

  const changeEmail = async () => {
    if (!pendingData) return;
    setDialogOpen(false);
    setButtonLoading(true);

    const res = await changeUserEmail(pendingData);

    if (res.ok) {
      setSnackbarOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.replace('/login');
    } else setError(res.error);

    await refreshAuth();
    setButtonLoading(false);
    setPendingData(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setPendingData(null);
  };

  return (
    <AuthRedirectToLogin>
      <Form onSubmit={handleSubmit(onSubmitPreCheck)}>
        <CurrentInfo infoType='Email' info={profile?.user.email ?? ''} />
        <FormControl fullWidth margin='normal'>
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address'
              },
              maxLength: {
                value: 100,
                message: 'Input email address within 100 letters'
              }
            }}
            render={({ field, fieldState }) => <Input field={field} label='Email' type='email' autoComplete='email' fieldState={fieldState} />}
          />
        </FormControl>
        <SubmitButton label='Change Email' error={error} loading={buttonLoading} />
        <LinkElement page='' display='Profile' />
      </Form>
      <ToastForChangeInfo dialogOpen={dialogOpen} snackbarOpen={snackbarOpen} buttonLoading={buttonLoading} setSnackbarOpen={setSnackbarOpen} handleCancel={handleCancel} changeName={changeEmail} />
    </AuthRedirectToLogin>
  );
}
