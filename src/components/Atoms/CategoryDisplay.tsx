import Link from 'next/link';

export default function CategoryDisplay({category}: {category: Category}) {
  return (
    <div>
      {
        category.userId === null
        ? <p key={category.id} className='bg-green-200'>{category.name}</p>
        : <Link key={category.id} href={`/categories/modify/${category.id}`} className='bg-green-200'>{category.name}</Link>
      }
    </div>
  );
}
