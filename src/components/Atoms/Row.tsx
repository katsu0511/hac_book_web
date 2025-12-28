'use client';

export default function Row({head, body}: {head: string, body: string}) {
  return (
    <div className='flex font-bold w-full h-10 leading-10 my-1'>
      <p className='bg-[color:var(--color-primary)] text-white w-75 pl-2'>{head}</p>
      <p className='bg-white text-[color:var(--color-primary)] w-117 pl-2'>{body}</p>
    </div>
  );
}
