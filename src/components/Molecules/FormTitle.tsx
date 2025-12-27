'use client';

import LinkButton from '@/components/Atoms/LinkButton';

type Props = {
  title: string
  link: string
  linkDisplay: string
};

export default function FormTitle({title, link, linkDisplay}: Props) {
  return (
    <h2 className='flex justify-between w-full border-b-2 border-gray-500 pt-5 mb-10'>
      <p className='text-xl pl-3'>{title}</p>
      <div>
        <LinkButton page={`/${link}`} display={linkDisplay} />
      </div>
    </h2>
  );
}
