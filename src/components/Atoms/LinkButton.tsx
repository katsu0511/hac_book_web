import Link from 'next/link';

export default function LinkButton({ page, display}: { page: string, display: string }) {
  return (
    <Link href={`${page}`} className='inline-block bg-[color:var(--color-primary)] text-white rounded-sm px-2 mx-2 duration-300 hover:opacity-40 cursor-pointer'>{display}</Link>
  );
}
