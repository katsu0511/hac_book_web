import FormTitle from './FormTitle';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/FormTitle',
  component: FormTitle,
} satisfies Meta<typeof FormTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CategoryDetails: Story = {
  args: {
    title: 'Category Details',
  },
};

export const TransactionDetails: Story = {
  args: {
    title: 'Transaction Details',
  },
};
