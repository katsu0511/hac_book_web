import Link from 'next/link';

export default function PageLink({page, display}: { page: string, display: string }) {
  return (
    <Link href={`./${page}`} className='inline-block text-[color:var(--color-primary)] font-bold duration-300 hover:opacity-40 cursor-pointer'>&gt;&gt; {display}</Link>
  );
}
