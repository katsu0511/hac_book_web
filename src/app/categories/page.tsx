'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function Categories() {
  const [incomes, setIncomes] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Category[]>([]);
  const { authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) router.replace('/login');
  }, [authenticated, router]);

  const category = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/display/category`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!res.ok) {
        router.replace('/');
        return;
      };

      const json = await res.json();
      if (json.income) setIncomes(json.income);
      if (json.expense) setExpenses(json.expense);
    } catch (error) {
      console.log(error instanceof Error ? error.message : 'unknown error');
    }
  }, [router]);

  useEffect(() => {
    category();
  }, [category]);

  return (
    <div>
      <h2>Category</h2>
      <h3 className='bg-red-500'>Income</h3>
      {incomes.map(income => (
        <p key={income.id} className='bg-blue-200'>{income.name}</p>
      ))}
       <h3 className='bg-red-500'>Expense</h3>
      {expenses.map(expense => (
        <p key={expense.id} className='bg-green-200'>{expense.name}</p>
      ))}
    </div>
  );
}
