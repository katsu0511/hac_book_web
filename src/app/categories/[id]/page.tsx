'use client';

import { useState, useCallback, useEffect } from 'react';
import { Category, CategoryDetail } from '@/types/category';
import { useParams } from 'next/navigation';
import { getCategory } from '@/lib/api/getters';
import FormTitle from '@/components/Molecules/FormTitle';
import Row from '@/components/Atoms/Row';
import Link from 'next/link';

export default function CategoryDetails() {
  const [category, setCategory] = useState<Category>();
  const [parent, setParent] = useState<string>('');
  const [loadingData, setLoadingData] = useState(true);

  const params = useParams();
  const id = params?.id;

  const fetchCategory = useCallback(async () => {
    const result = await getCategory(id as string);
    if (!result.ok) console.log(result.error);
    else {
      const res: CategoryDetail = await result.response.json();
      setCategory(res.category);
      setParent(res.parentName);
    }
  }, [id]);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    await fetchCategory();
    setLoadingData(false);
  }, [fetchCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loadingData) return <div>Loading...</div>;

  return (
    <div>
      <FormTitle title='Category Details' link='categories' linkDisplay='Categories' />
      <div className='w-full h-full md:max-w-screen-md mx-auto'>
        <div className='bg-[color:var(--color-primary)] text-white font-bold w-full h-10 text-center leading-10'>{parent === '' ? 'Parent Category' : 'Child Category'}</div>
        { parent !== '' && <Row head='Parent' body={parent} /> }
        <Row head='Name' body={category?.name ?? ''} />
        <Row head='Type' body={category?.type === 'EXPENSE' ? 'Expense' : 'Income'} />
        <Row head='Description' body={category?.description ?? ''} />
      </div>
      <Link
        href={`/categories/modify/${category?.id}`}
        className='block bg-[color:var(--color-primary)] text-white text-l w-20 h-8 text-center leading-8 rounded-sm border border-solid border-[color:var(--color-primary)] mx-auto my-10 duration-300 hover:bg-white hover:text-[color:var(--color-primary)]'
      >
        Edit
      </Link>
    </div>
  );
}
