'use client';

import { getCurrentMonth } from '@/lib/domain/month';

const month = getCurrentMonth();

export default function Title({ title, start, end }: { title?: string, start?: string, end?: string }) {
  const heading = title ? title : start && end ? <>from <span className='font-bold'>{start}</span> to <span className='font-bold'>{end}</span></> : <>in <span className='font-bold'>{month}</span></>;
  return <p className='text-2xl'>{title ? heading : <>Income and Expense {heading}</>}</p>;
}
