'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import FormTitle from '@/components/Molecules/FormTitle';
import Link from 'next/link';
import Image from 'next/image';
import Row from '@/components/Atoms/Row';
import LinkElement from '@/components/Molecules/LinkElement';

export default function Profile() {
  const { profile } = useAuthState();

  return (
    <AuthRedirectToLogin>
      <FormTitle title='Profile' />
      <div className='pt-10'>
        <div className='w-20 h-20 mx-auto my-0'>
          <Link href='./icon' className='duration-300 hover:opacity-40'>
            <Image src={profile ? `/${profile.user.icon}` : '/default.png'} width={80} height={80} alt='User'/>
          </Link>
        </div>
        <div className='w-full h-full md:max-w-screen-md mx-auto mt-10'>
          <Row head='Name' body={profile?.user.name ?? ''} />
          <Row head='Email' body={profile?.user.email ?? ''} />
        </div>
        <LinkElement page='profile/name' display='Change Name' />
        <LinkElement page='profile/email' display='Change Email' />
        <LinkElement page='profile/password' display='Change Password' />
      </div>
    </AuthRedirectToLogin>
  );
}
