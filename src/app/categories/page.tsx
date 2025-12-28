'use client';

import { useState } from 'react';
import { Category } from '@/types/category';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { getCategories } from '@/lib/api/getters';
import TitleLine from '@/components/Molecules/TitleLine';
import CategoryItems from '@/components/Organisms/CategoryItems';
import LinkElement from '@/components/Molecules/LinkElement';

export default function Categories() {
  const [incomes, setIncomes] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Category[]>([]);
  const router = useRouter();

  const category = useCallback(async () => {
    const categories = await getCategories();
    if (categories === undefined) return;
    else if (categories === null) router.replace('/');
    else {
      if (categories.income) setIncomes(categories.income);
      if (categories.expense) setExpenses(categories.expense);
    }
  }, [router]);

  useEffect(() => {
    category();
  }, [category]);

  return (
    <div className='pb-10'>
      <TitleLine title='Category' />
      <div className='w-full h-full md:max-w-screen-md mx-auto my-0'>
        <CategoryItems title='Expense' items={expenses} />
        <CategoryItems title='Income' items={incomes} />
      </div>
      <LinkElement page='categories/add' display='Add Category' />
    </div>
  );
}
