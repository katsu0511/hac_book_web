import TransactionDate from './TransactionDate';
import { FieldErrors, Control, useForm } from 'react-hook-form';
import { TransactionFormData } from '@/types/transaction';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/TransactionDate',
  component: TransactionDate,
  args: {
    errors: {} as FieldErrors<TransactionFormData>,
    control: {} as Control<TransactionFormData>,
  },
  render: () => {
    const { control, formState: { errors } } = useForm<TransactionFormData>({
      defaultValues: {
        transactionDate: new Date().toISOString().split('T')[0]
      },
      mode: 'onChange',
    });

    return <TransactionDate control={control} errors={errors} />;
  },
} satisfies Meta<typeof TransactionDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
