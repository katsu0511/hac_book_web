import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>Hello World!</h2>
      <div>
        <Link href={'/categories'}>Category</Link>
      </div>
      <div>
        <Link href={'/transactions'}>Transaction</Link>
      </div>
    </div>
  );
}
