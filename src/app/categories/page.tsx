'use client';

import { useState } from 'react';
import { Category, Categories as CategoryList } from '@/types/category';
import { useCallback, useEffect } from 'react';
import { getCategories } from '@/lib/api/getters';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import TitleLine from '@/components/Molecules/TitleLine';
import CategoryItems from '@/components/Organisms/CategoryItems';
import LinkElement from '@/components/Molecules/LinkElement';

export default function Categories() {
  const [incomes, setIncomes] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    const result = await getCategories();
    if (!result.ok) console.log(result.error);
    else {
      const categories: CategoryList = await result.response.json();
      if (categories.income) setIncomes(categories.income);
      if (categories.expense) setExpenses(categories.expense);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <AuthRedirectToLogin>
      <div className='pb-10'>
        <TitleLine title='Category' />
        <div className='w-full h-full md:max-w-screen-md mx-auto my-0'>
          <CategoryItems title='Expense' items={expenses} />
          <CategoryItems title='Income' items={incomes} />
        </div>
        <LinkElement page='categories/add' display='Add Category' />
      </div>
    </AuthRedirectToLogin>
  );
}
