import { Category } from '@/types/category';
import CategoryDisplay from '../Molecules/CategoryDisplay';

export default function CategoryItems({title, items}: {title: string, items: Category[]}) {
  return (
    <>
      <h3 className='text-xl'>{title}</h3>
      <div className='flex flex-col items-end mt-2 mb-4'>
        {items.map(item => (
          <CategoryDisplay key={item.id} category={item} />
        ))}
      </div>
    </>
  );
}
