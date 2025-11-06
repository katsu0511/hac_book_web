'use client';

import { useAuthRedirectToLogin } from '@/lib/hooks/useAuthRedirect';
import LoginForm from '@/components/Organisms/LoginForm';

export default function Login() {
  useAuthRedirectToLogin();
  return <LoginForm />;
}
