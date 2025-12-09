'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { useState, useCallback, useEffect } from 'react';
import { getSummary } from '@/lib/api/getters';
import LinkButton from '@/components/Atoms/LinkButton';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nowDate = new Date();
const nowMonth = Month[nowDate.getMonth()];

export default function Home() {
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

  const entries = Object.entries(expenseBreakdown).filter(([, value]) => value > 0);
  const labels = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: values,
        backgroundColor: [
          '#4dc9f6',
          '#f67019',
          '#f53794',
          '#537bc4',
          '#acc236',
          '#166a8f',
          '#00a950',
          '#58595b',
          '#8549ba',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    cutout: '50%',
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className='w-full h-full'>
      <h2 className='flex justify-between w-full border-b-2 border-gray-500 pt-5 mb-10'>
        <p className='text-2xl'>Income and Expense in <span className='font-bold'>{nowMonth}</span></p>
        <div>
          <LinkButton page='categories' display='Category' />
          <LinkButton page='transactions' display='Transaction' />
        </div>
      </h2>
      <div className='flex justify-center items-center'>
        <div className='w-1/2 text-xl'>
          <div className='flex items-center py-3'>
            <h3 className='w-60'>Income in {nowMonth}:</h3>
            <p>${income}</p>
          </div>
          <div className='flex items-center py-3'>
            <h3 className='w-60'>Expense in {nowMonth}:</h3>
            <p>${expense}</p>
          </div>
          <div className='flex items-center py-3'>
            <h3 className='w-60'>Income - Expense:</h3>
            <p>${income - expense}</p>
          </div>
        </div>
        <div className='w-1/2'>
          <div className='w-full'>
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}
