import CategoryDisplay from './CategoryDisplay';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoryType } from '@/constants/CategoryType';

const meta = {
  title: 'Molecules/CategoryDisplay',
  component: CategoryDisplay,
} satisfies Meta<typeof CategoryDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Groceries: Story = {
  args: {
    category: {
      id: '2',
      userId: '1',
      parentId: '1',
      name: 'Groceries',
      type: CategoryType.EXPENSE,
      description: 'Groceries cost',
      active: true,
    },
  },
};

export const Salary: Story = {
  args: {
    category: {
      id: '1',
      userId: '1',
      parentId: '',
      name: 'Salary',
      type: CategoryType.INCOME,
      description: '',
      active: true,
    },
  },
};
