'use client';

export default function FormTitle({title}: {title: string}) {
  return (
    <h2 className='flex justify-between w-full border-b-2 border-gray-500 pt-5'>
      <p className='text-xl pl-3'>{title}</p>
    </h2>
  );
}
