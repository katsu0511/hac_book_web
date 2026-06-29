'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import FormTitle from '@/components/Molecules/FormTitle';
import Row from '@/components/Atoms/Row';
import LinkElement from '@/components/Molecules/LinkElement';

export default function Profile() {
  const { profile } = useAuthState();

  return (
    <AuthRedirectToLogin>
      <FormTitle title='Setting' />
      <div className='pt-10'>
        <div className='w-full h-full md:max-w-screen-md mx-auto mt-10'>
          <Row head='Currency' body={profile?.setting.currency ?? ''} />
          <Row head='Language' body={profile?.setting.language ?? ''} />
          <Row head='Monthly Saving Goal' body={`$${profile?.setting.monthlySavingGoal ?? ''}`} />
        </div>
        <LinkElement page='setting/saving-goal' display='Change Monthly Saving Goal' />
      </div>
    </AuthRedirectToLogin>
  );
}
