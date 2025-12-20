'use client';

import { getCurrentMonth } from '@/lib/domain/month';
import LinkButton from '@/components/Atoms/LinkButton';

const month = getCurrentMonth();

export default function Dashboard() {
  return (
    <h2 className='flex justify-between w-full border-b-2 border-gray-500 pt-5 mb-10'>
      <p className='text-2xl'>Income and Expense in <span className='font-bold'>{month}</span></p>
      <div>
        <LinkButton page='categories' display='Category' />
        <LinkButton page='transactions' display='Transaction' />
        <LinkButton page='summary' display='Summary' />
      </div>
    </h2>
  );
}
