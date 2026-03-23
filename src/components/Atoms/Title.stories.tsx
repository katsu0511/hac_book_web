import Title from '@/components/Atoms/Title';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Atoms/Title',
  component: Title,
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CategoryTitle: Story = {
  args: {
    title: 'Category',
  },
};

export const TransactionTitle: Story = {
  args: {
    title: 'Transaction',
    month: 'January',
  },
};

export const HomeTitle: Story = {
  args: {
    title: 'Income and Expense',
    month: 'January',
  },
};

export const DashboardTitle: Story = {
  args: {
    title: 'Income and Expense',
    start: '2026-12-01',
    end: '2026-12-31',
  },
};
