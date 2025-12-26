'use client';

import { usePathname } from 'next/navigation';
import Title from '@/components/Atoms/Title';
import LinkButton from '@/components/Atoms/LinkButton';

export default function TitleLine({ title, start, end }: { title?: string, start?: string, end?: string }) {
  const pathname = usePathname();

  return (
    <h2 className='flex justify-between w-full border-b-2 border-gray-500 pt-5 mb-10'>
      <Title title={title} start={start} end={end} />
      <div>
        {pathname !== '/' && <LinkButton page='/' display='Home' />}
        {pathname !== '/categories' && <LinkButton page='categories' display='Category' />}
        {pathname !== '/transactions' && <LinkButton page='transactions' display='Transaction' />}
        {pathname !== '/summary' && <LinkButton page='summary' display='Summary' />}
      </div>
    </h2>
  );
}
