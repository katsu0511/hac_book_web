'use client';

import { useState, useCallback, useEffect } from 'react';
import { getSummary } from '@/lib/api/getters';
import Title from '@/components/Molecules/Title';
import DoughnutGraph from '@/components/Molecules/DoughnutGraph';
import { getCurrentMonth } from '@/lib/domain/month';

const month = getCurrentMonth();

export default function Dashboard() {
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [expenseBreakdown, setExpenseBreakdown] = useState<Record<string, number>>({});

  const fetchSummary = useCallback(async () => {
    const summary = await getSummary();
    if (summary === null) return;
    else {
      setIncome(summary.income);
      setExpense(summary.expense);
      setExpenseBreakdown(summary.expenseBreakdown);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <div className='w-full h-full'>
      <Title />
      <div className='flex justify-center items-center'>
        <div className='w-1/2 text-xl'>
          <div className='flex items-center py-3'>
            <h3 className='w-60'>Income in {month}:</h3>
            <p>${income}</p>
          </div>
          <div className='flex items-center py-3'>
            <h3 className='w-60'>Expense in {month}:</h3>
            <p>${expense}</p>
          </div>
          <div className='flex items-center py-3'>
            <h3 className='w-60'>Income - Expense:</h3>
            <p>${income - expense}</p>
          </div>
        </div>
        <DoughnutGraph expenses={expenseBreakdown} />
      </div>
    </div>
  );
}
