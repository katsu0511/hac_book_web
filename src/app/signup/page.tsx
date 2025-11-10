'use client';

import { useAuthRedirectToLogin } from '@/lib/hooks/useAuthRedirect';
import SignupForm from '@/components/Organisms/SignupForm';

export default function Signup() {
  useAuthRedirectToLogin();
  return <SignupForm />;
}
