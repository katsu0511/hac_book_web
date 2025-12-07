'use client';

import { useState, useCallback, useEffect } from 'react';
import { getSummary } from '@/lib/api/getters';
import Link from 'next/link';

export default function Home() {
  const [income, setIncome] = useState<string>('');
  const [expense, setExpense] = useState<string>('');
  const [incomeBreakdown, setIncomeBreakdown] = useState<Record<string, string>>({});
  const [expenseBreakdown, setExpenseBreakdown] = useState<Record<string, string>>({});

  const fetchSummary = useCallback(async () => {
    const summary = await getSummary();
    if (summary === null) return;
    else {
      setIncome(summary.income);
      setExpense(summary.expense);
      setIncomeBreakdown(summary.incomeBreakdown);
      setExpenseBreakdown(summary.expenseBreakdown);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <div>
      <h2>Income and Expense in this month</h2>
      <p>Income: {income}</p>
      <p>Expense: {expense}</p>
      <div className='border-1 border-blue-500'>
        {
          Object.entries(expenseBreakdown).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))
        }
        {
          Object.entries(incomeBreakdown).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))
        }
      </div>
      <div>
        <Link href={'/categories'}>Category</Link>
      </div>
      <div>
        <Link href={'/transactions'}>Transaction</Link>
      </div>
    </div>
  );
}
