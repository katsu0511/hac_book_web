import Row from '@/components/Atoms/Row';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Atoms/Row',
  component: Row,
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ParentCategory: Story = {
  args: {
    head: 'Parent',
    body: 'Food'
  },
};

export const CategoryName: Story = {
  args: {
    head: 'Name',
    body: 'Groceries'
  },
};

export const CategoryType: Story = {
  args: {
    head: 'Type',
    body: 'Expense'
  },
};

export const CategoryDescription: Story = {
  args: {
    head: 'Description',
    body: 'Cost of groceries'
  },
};

export const Category: Story = {
  args: {
    head: 'Category',
    body: 'Groceries'
  },
};

export const TransactionAmount: Story = {
  args: {
    head: 'Amount',
    body: '$20.5'
  },
};

export const TransactionDate: Story = {
  args: {
    head: 'Transaction Date',
    body: '2026-12-31'
  },
};

export const TransactionDescription: Story = {
  args: {
    head: 'Description',
    body: 'Grab some groceries at COSTCO'
  },
};
