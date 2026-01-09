'use client';

import { Dayjs } from 'dayjs';
import { useState, useCallback, useEffect } from 'react';
import { getSummary } from '@/lib/api/getters';
import TitleLine from '@/components/Molecules/TitleLine';
import Date from '@/components/Atoms/Date';
import DoughnutGraph from '@/components/Molecules/DoughnutGraph';

type Props = {
  month?: string
  start?: Dayjs
  end?: Dayjs
  setStart?: (newValue: Dayjs) => void
  setEnd?: (newValue: Dayjs) => void
};

export default function Dashboard({ month, start, end, setStart, setEnd }: Props) {
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
      <TitleLine title='Income and Expense' month={month} start={startStr} end={endStr} />
      {
        start && end && setStart && setEnd &&
        <div className='w-full mx-auto mb-4 md:w-160 md:mb-10'>
          <Date label='Start date' date={start} onChange={setStart} maxDate={end} />
          <Date label='End date' date={end} onChange={setEnd} minDate={start} />
        </div>
      }
      <div className='block items-center xl:flex xl:justify-center'>
        <DoughnutGraph expenses={expenseBreakdown} />
        <div className='w-full text-xl order-1 pb-10 xl:w-1/2 xl:pb-0'>
          <div className='flex items-center w-72 py-3 mx-auto md:w-85'>
            <h3 className='w-47 md:w-60'>Income:</h3>
            <p className='w-25'>${income}</p>
          </div>
          <div className='flex items-center w-72 py-3 mx-auto md:w-85'>
            <h3 className='w-47 md:w-60'>Expense:</h3>
            <p className='w-25'>${expense}</p>
          </div>
          <div className='flex items-center w-72 py-3 mx-auto md:w-85'>
            <h3 className='w-47 md:w-60'>Income - Expense:</h3>
            <p className='w-25'>${income - expense}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
