import CategorySelect from './CategorySelect';
import { FieldErrors, Control, useForm } from 'react-hook-form';
import { TransactionFormData } from '@/types/transaction';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Category } from '@/types/category';
import { CategoryType } from '@/constants/CategoryType';

const meta = {
  title: 'Molecules/CategorySelect',
  component: CategorySelect,
  args: {
    errors: {} as FieldErrors<TransactionFormData>,
    control: {} as Control<TransactionFormData>,
  },
  render: (args) => {
    const { control, formState: { errors } } = useForm<TransactionFormData>({
      defaultValues: {
        categoryId: '',
      },
      mode: 'onChange',
    });

    return <CategorySelect {...args} control={control} errors={errors} />;
  },
} satisfies Meta<typeof CategorySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const expenses: Category[] = [
  {
    id: '1',
    userId: '1',
    parentId: '',
    name: 'Food',
    type: CategoryType.EXPENSE,
    description: '',
    active: true,
  },
  {
    id: '2',
    userId: '1',
    parentId: '1',
    name: 'Groceries',
    type: CategoryType.EXPENSE,
    description: 'Groceries cost',
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
  }
];

export const Default: Story = {
  args: {
    expenses: expenses,
    incomes: incomes,
  },
};
