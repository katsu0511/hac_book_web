'use client';

import { getCurrentMonth } from '@/lib/domain/month';
import Dashboard from '@/components/Organisms/Dashboard';

const month = getCurrentMonth();

export default function Home() {
  return <Dashboard month={month} />;
}
