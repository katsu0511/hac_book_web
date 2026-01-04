'use client';

import Title from '@/components/Atoms/Title';

export default function TitleLine({ title, month, start, end }: { title: string, month?: string, start?: string, end?: string }) {
  return (
    <h2 className='flex justify-between w-full border-b-2 border-gray-500 pt-5 mb-10'>
      <Title title={title} month={month} start={start} end={end} />
    </h2>
  );
}
