'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { useForm, Controller } from 'react-hook-form';
import { changeUserMonthlySavingGoal } from '@/lib/api/actions';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import Form from '@/components/Organisms/Form';
import CurrentInfo from '@/components/Atoms/CurrentInfo';
import { FormControl } from '@mui/material';
import Input from '@/components/Atoms/Input';
import SubmitButton from '@/components/Molecules/SubmitButton';
import LinkElement from '@/components/Molecules/LinkElement';

const defaultValues = { monthlySavingGoal: '' };

export default function SavingGoalChangeForm() {
  const { buttonLoading, setButtonLoading, error, setError, profile, refreshAuth, router } = useAuthState();
  const { control, handleSubmit } = useForm<Setting>({ defaultValues });

  const changeMonthlySavingGoal = async (data: Setting) => {
    setButtonLoading(true);
    const res = await changeUserMonthlySavingGoal(data);
    if (res.ok) router.replace('/setting');
    else setError(res.error);
    await refreshAuth();
    setButtonLoading(false);
  };

  return (
    <AuthRedirectToLogin>
      <Form onSubmit={handleSubmit(changeMonthlySavingGoal)}>
        <CurrentInfo infoType='Monthly Saving Goal' info={profile?.setting.monthlySavingGoal ?? ''} />
        <FormControl fullWidth margin='normal'>
          <Controller
            name='monthlySavingGoal'
            control={control}
            rules={{ required: 'Monthly Saving Goal is required' }}
            render={({ field, fieldState }) => <Input field={field} label='Monthly Saving Goal' type='number' autoComplete='on' fieldState={fieldState} />}
          />
        </FormControl>
        <SubmitButton label='Change Saving Goal' error={error} loading={buttonLoading} />
        <LinkElement page='' display='Setting' />
      </Form>
    </AuthRedirectToLogin>
  );
}
