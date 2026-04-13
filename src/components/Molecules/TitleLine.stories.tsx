import TitleLine from './TitleLine';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/TitleLine',
  component: TitleLine,
} satisfies Meta<typeof TitleLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {
  args: {
    title: 'Category',
  },
};

export const Transactions: Story = {
  args: {
    title: 'Transactions',
    month: 'December',
  },
};

export const TopPage: Story = {
  args: {
    title: 'Income and Expense',
    month: 'December',
  },
};

export const Dashboard: Story = {
  args: {
    title: 'Income and Expense',
    start: '2026-12-01',
    end: '2026-12-31',
  },
};
