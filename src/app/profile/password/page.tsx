'use client';

import { useState } from 'react';
import useAuthState from '@/lib/hooks/useAuthState';
import { useForm, Controller } from 'react-hook-form';
import { changeUserPassword } from '@/lib/api/actions';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import Form from '@/components/Organisms/Form';
import FormControl from '@mui/material/FormControl';
import Input from '@/components/Atoms/Input';
import SubmitButton from '@/components/Molecules/SubmitButton';
import LinkElement from '@/components/Molecules/LinkElement';
import ToastForChangeInfo from '@/components/Molecules/ToastForChangeInfo';

const defaultValues = {
  currentPassword: '',
  newPassword: ''
};

export default function PasswordChangeForm() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [pendingData, setPendingData] = useState<PasswordFormData | null>(null);

  const { buttonLoading, setButtonLoading, error, setError, refreshAuth, router } = useAuthState();
  const { control, handleSubmit } = useForm<PasswordFormData>({ defaultValues });

  const onSubmitPreCheck = (data: PasswordFormData) => {
    if (data.currentPassword === data.newPassword) {
      setError('Input different password');
      return;
    }
    setPendingData(data);
    setDialogOpen(true);
  };

  const changePassword = async () => {
    if (!pendingData) return;
    setDialogOpen(false);
    setButtonLoading(true);

    const res = await changeUserPassword(pendingData);

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
        <FormControl fullWidth margin='normal'>
          <Controller
            name='currentPassword'
            control={control}
            rules={{ required: 'Old Password is required' }}
            render={({ field, fieldState }) => <Input field={field} label='Old Password' type='password' autoComplete='current-password' fieldState={fieldState} />}
          />
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <Controller
            name='newPassword'
            control={control}
            rules={{ required: 'New Password is required' }}
            render={({ field, fieldState }) => <Input field={field} label='New Password' type='password' autoComplete='new-password' fieldState={fieldState} />}
          />
        </FormControl>
        <SubmitButton label='Change Password' error={error} loading={buttonLoading} />
        <LinkElement page='' display='Profile' />
      </Form>
      <ToastForChangeInfo dialogOpen={dialogOpen} snackbarOpen={snackbarOpen} buttonLoading={buttonLoading} setSnackbarOpen={setSnackbarOpen} handleCancel={handleCancel} changeName={changePassword} />
    </AuthRedirectToLogin>
  );
}
