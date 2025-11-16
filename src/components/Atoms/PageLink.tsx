import Link from 'next/link';

export default function PageLink(props: { page: string }) {
  return (
    <Link href={`./${props.page}`} className='inline-block text-[color:var(--color-primary)] font-bold duration-300 hover:opacity-40 cursor-pointer'>&gt;&gt; {`${props.page.charAt(0).toUpperCase()}${props.page.slice(1)}`}</Link>
  );
}
