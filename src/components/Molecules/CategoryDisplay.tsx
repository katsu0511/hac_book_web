import { Category } from '@/types/category';
import Link from 'next/link';

export default function CategoryDisplay({category}: {category: Category}) {
  const width = category.parentId ? 'w-[calc(100%-40px)]' : 'w-full';

  return (
    <div key={category.id} className={`flex justify-between bg-[color:var(--color-primary)] ${width} text-white font-bold h-12 rounded-sm px-2 mb-1`}>
      {
        category.userId
        ? <Link href={`/categories/${category.id}`} className='text-xl leading-12 duration-300 hover:opacity-60'>{category.name}</Link>
        : <div className='text-xl leading-12'>{`${category.name} (Default)`}</div>
      }
      {
        category.userId &&
        <Link
          href={`/categories/modify/${category.id}`}
          className='bg-white text-[color:var(--color-primary)] text-l h-8 leading-8 rounded-sm px-2 my-2 duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'
        >
          Edit
        </Link>
      }
    </div>
  );
}
