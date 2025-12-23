'use client';

import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { getFirstDayOfCurrentMonth, getToday } from '@/lib/domain/month';
import Dashboard from '@/components/Organisms/Dashboard';

export default function Summary() {
  const [start, setStart] = useState<Dayjs>(getFirstDayOfCurrentMonth());
  const [end, setEnd] = useState<Dayjs>(getToday());
  return <Dashboard start={start} end={end} setStart={setStart} setEnd={setEnd} />;
}
