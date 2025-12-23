'use client';

import { getCurrentMonth } from '@/lib/domain/month';
import LinkButton from '@/components/Atoms/LinkButton';
import { usePathname } from 'next/navigation';

const month = getCurrentMonth();

export default function Dashboard({ start, end }: { start?: string, end?: string }) {
  const period = start && end ? <>from <span className='font-bold'>{start}</span> to <span className='font-bold'>{end}</span></> : <>in <span className='font-bold'>{month}</span></>;
  const pathname = usePathname();

  return (
    <h2 className='flex justify-between w-full border-b-2 border-gray-500 pt-5 mb-10'>
      <p className='text-2xl'>Income and Expense {period}</p>
      <div>
        {pathname !== '/' && <LinkButton page='' display='Home' />}
        <LinkButton page='categories' display='Category' />
        <LinkButton page='transactions' display='Transaction' />
        {pathname !== '/summary' && <LinkButton page='summary' display='Summary' />}
      </div>
    </h2>
  );
}
