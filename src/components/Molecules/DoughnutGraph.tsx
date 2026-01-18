'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { ExpenseBreakdown } from '@/types/summary';
import { COLORS } from '@/constants/Color';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutGraph(props: { expenses: ExpenseBreakdown[] }) {
  const entries = props.expenses.map(b => ({
    name: b.categoryName,
    value: b.total,
  }));
  const labels = entries.map(e => e.name);
  const values = entries.map(e => e.value);

  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: values,
        backgroundColor: COLORS,
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
    <div className='w-full order-2 mb-10 xl:w-1/2 xl:mb-0'>
      <div className='w-full'>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
