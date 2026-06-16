'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { useForm, Controller } from 'react-hook-form';
import { changeUserName } from '@/lib/api/actions';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import Form from '@/components/Organisms/Form';
import CurrentInfo from '@/components/Atoms/CurrentInfo';
import { FormControl } from '@mui/material';
import Input from '@/components/Atoms/Input';
import SubmitButton from '@/components/Molecules/SubmitButton';
import LinkElement from '@/components/Molecules/LinkElement';

const defaultValues = { name: '' };

export default function NameChangeForm() {
  const { buttonLoading, setButtonLoading, error, setError, profile, refreshAuth, router } = useAuthState();
  const { control, handleSubmit } = useForm<User>({ defaultValues });

  const changeName = async (data: User) => {
    setButtonLoading(true);
    const res = await changeUserName(data);
    if (res.ok) router.replace('/profile');
    else setError(res.error);
    await refreshAuth();
    setButtonLoading(false);
  };

  return (
    <AuthRedirectToLogin>
      <Form onSubmit={handleSubmit(changeName)}>
        <CurrentInfo infoType='Name' info={profile?.user.name ?? ''} />
        <FormControl fullWidth margin='normal'>
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState }) => <Input field={field} label='Name' type='text' autoComplete='name' fieldState={fieldState} />}
          />
        </FormControl>
        <SubmitButton label='Change Name' error={error} loading={buttonLoading} />
        <LinkElement page='' display='Profile' />
      </Form>
    </AuthRedirectToLogin>
  );
}
