'use client';

import { getCurrentMonth } from '@/lib/domain/month';
import { Dayjs } from 'dayjs';
import { useState, useCallback, useEffect } from 'react';
import { getSummary } from '@/lib/api/getters';
import TitleLine from '@/components/Molecules/TitleLine';
import Date from '@/components/Atoms/Date';
import DoughnutGraph from '@/components/Molecules/DoughnutGraph';

const month = getCurrentMonth();

type Props = {
  start?: Dayjs
  end?: Dayjs
  setStart?: (newValue: Dayjs) => void
  setEnd?: (newValue: Dayjs) => void
};

export default function Dashboard({ start, end, setStart, setEnd }: Props) {
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [expenseBreakdown, setExpenseBreakdown] = useState<Record<string, number>>({});

  const startStr = start ? start.format('YYYY-MM-DD') : undefined;
  const endStr = end ? end.format('YYYY-MM-DD') : undefined;

  const fetchSummary = useCallback(async () => {
    const summary = await getSummary(startStr, endStr);
    if (summary === null) return;
    else {
      setIncome(summary.income);
      setExpense(summary.expense);
      setExpenseBreakdown(summary.expenseBreakdown);
    }
  }, [startStr, endStr]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <div className='w-full h-full'>
      <TitleLine start={startStr} end={endStr} />
      {
        start && end && setStart && setEnd &&
        <div className='w-160 mx-auto mb-10'>
          <Date label='Start date' date={start} onChange={setStart} maxDate={end} />
          <Date label='End date' date={end} onChange={setEnd} minDate={start} />
        </div>
      }
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
