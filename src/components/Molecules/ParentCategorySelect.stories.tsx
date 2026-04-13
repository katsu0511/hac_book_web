import ParentCategorySelect from './ParentCategorySelect';
import { FieldErrors, Control, useForm } from 'react-hook-form';
import { CategoryFormData, Category } from '@/types/category';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoryType } from '@/constants/CategoryType';

const meta = {
  title: 'Molecules/ParentCategorySelect',
  component: ParentCategorySelect,
  args: {
    errors: {} as FieldErrors<CategoryFormData>,
    control: {} as Control<CategoryFormData>,
  },
  render: (args) => {
    const { control, formState: { errors } } = useForm<CategoryFormData>({
      defaultValues: {
        parentId: '',
      },
      mode: 'onChange',
    });

    return <ParentCategorySelect {...args} control={control} errors={errors} />;
  },
} satisfies Meta<typeof ParentCategorySelect>;

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

export const Default: Story = {
  args: {
    expenses: expenses,
    incomes: incomes,
  },
};
