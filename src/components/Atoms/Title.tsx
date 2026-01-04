'use client';

export default function Title({ title, month, start, end }: { title: string, month?: string, start?: string, end?: string }) {
  const sp = <br className='block sm:hidden' />;
  const headingMonth = month ? <>{sp} in <span className='font-bold'>{month}</span></> : null;
  const headingPeriod = start && end ? <>{sp}<span className='font-bold'> {start}</span> ~ <span className='font-bold'>{end}</span></> : null;
  const heading = headingMonth ? headingMonth : headingPeriod ? headingPeriod : null;
  return <p className='text-2xl'>{title}{heading}</p>;
}
