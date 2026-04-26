import CategoryItems from './CategoryItems';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Category } from '@/types/category';
import { CategoryType } from '@/constants/CategoryType';

const meta = {
  title: 'Organisms/CategoryItems',
  component: CategoryItems,
} satisfies Meta<typeof CategoryItems>;

export default meta;
type Story = StoryObj<typeof meta>;

const expenses: Category[] = [
  {
    id: '1',
    userId: '1',
    parentId: '',
    name: 'Housing',
    type: CategoryType.EXPENSE,
    description: '',
    active: true,
  },
  {
    id: '2',
    userId: '1',
    parentId: '',
    name: 'Food',
    type: CategoryType.EXPENSE,
    description: '',
    active: true,
  },
  {
    id: '3',
    userId: '1',
    parentId: '',
    name: 'Others',
    type: CategoryType.EXPENSE,
    description: '',
    active: true,
  }
];

const incomes: Category[] = [
  {
    id: '1',
    userId: '1',
    parentId: '',
    name: 'Salary',
    type: CategoryType.INCOME,
    description: '',
    active: true,
  },
  {
    id: '2',
    userId: '1',
    parentId: '',
    name: 'Others',
    type: CategoryType.INCOME,
    description: '',
    active: true,
  }
];

export const Expenses: Story = {
  args: {
    title: 'Expense',
    items: expenses,
  },
};

export const Incomes: Story = {
  args: {
    title: 'Income',
    items: incomes,
  },
};
