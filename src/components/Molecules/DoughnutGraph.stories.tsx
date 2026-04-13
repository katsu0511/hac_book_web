import DoughnutGraph from './DoughnutGraph';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ExpenseBreakdown } from '@/types/summary';

const meta = {
  title: 'Molecules/DoughnutGraph',
  component: DoughnutGraph,
} satisfies Meta<typeof DoughnutGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const expenses: ExpenseBreakdown[] = [
  {
    categoryId: 1,
    categoryName: 'Food',
    total: 120,
  },
  {
    categoryId: 2,
    categoryName: 'Housing',
    total: 1500,
  }
];

export const Graph: Story = {
  args: {
    expenses: expenses
  },
};
