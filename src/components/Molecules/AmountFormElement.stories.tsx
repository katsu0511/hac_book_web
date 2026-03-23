import AmountFormElement from './AmountFormElement';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { TransactionFormData } from '@/types/transaction';
import { useEffect } from 'react';

const meta = {
  title: 'Molecules/AmountFormElement',
  component: AmountFormElement,
  args: {
    errors: {} as FieldErrors<TransactionFormData>,
    control: {} as Control<TransactionFormData>,
  },
  render: (args) => {
    const { control, formState: { errors } } = useForm<TransactionFormData>({
      defaultValues: {
        amount: '0',
      },
      mode: 'onChange',
    });

    return <AmountFormElement {...args} control={control} errors={errors} />;
  },
} satisfies Meta<typeof AmountFormElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = {
  render: (args) => {
    const { control, setError, formState: { errors } } = useForm<TransactionFormData>({
      defaultValues: { amount: '-1' },
    });

    useEffect(() => {
      setError('amount', { type: 'manual', message: 'Enter a valid amount with up to 2 decimal places' });
    }, [setError]);

    return <AmountFormElement {...args} control={control} errors={errors} />;
  },
};
