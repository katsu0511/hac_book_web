import Link from 'next/link';

export default function PageLink({usage}: {usage: string}) {
  const display = usage.charAt(0).toUpperCase() + usage.slice(1);

  return (
    <div className='flex justify-center mt-10'>
      <Link href={`./${usage}`} className='inline-block text-blue-500 font-bold duration-300 hover:opacity-40 cursor-pointer'>&gt;&gt; {display}</Link>
    </div>
  );
}
