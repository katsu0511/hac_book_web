'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { COLORS } from '@/constants/Color';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutGraph(props: { expenses: Record<string, number> }) {
  const entries = Object.entries(props.expenses).filter(([, value]) => value > 0);
  const labels = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

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
