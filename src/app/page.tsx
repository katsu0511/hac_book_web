'use client';

import { getCurrentMonth } from '@/lib/domain/month';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import Dashboard from '@/components/Organisms/Dashboard';

const month = getCurrentMonth();

export default function Home() {
  return (
    <AuthRedirectToLogin>
      <Dashboard month={month} />
    </AuthRedirectToLogin>
  );
}
