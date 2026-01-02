'use client';

export default function Title({ title, month, start, end }: { title: string, month?: string, start?: string, end?: string }) {
  const headingMonth = month ? <> in <span className='font-bold'>{month}</span></> : null;
  const headingPeriod = start && end ? <> from <span className='font-bold'>{start}</span> to <span className='font-bold'>{end}</span></> : null;
  const heading = headingMonth ? headingMonth : headingPeriod ? headingPeriod : null;
  return <p className='text-2xl'>{title}{heading}</p>;
}
