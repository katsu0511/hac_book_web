'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { getMyCategories } from '@/lib/getters';
import CategoryDisplay from '@/components/Atoms/CategoryDisplay';

export default function Categories() {
  const [incomes, setIncomes] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Category[]>([]);
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!authenticated) router.replace('/login');
  }, [authenticated, loading, router]);

  const category = useCallback(async () => {
    const categories = await getMyCategories();
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
    <div>
      <h2>Category</h2>
       <h3 className='bg-red-500'>Expense</h3>
      {expenses.map(expense => (
        <CategoryDisplay key={expense.id} category={expense} />
      ))}
      <h3 className='bg-red-500'>Income</h3>
      {incomes.map(income => (
        <CategoryDisplay key={income.id} category={income} />
      ))}
      <Link href={'/categories/add'} >Add Category</Link>
    </div>
  );
}
