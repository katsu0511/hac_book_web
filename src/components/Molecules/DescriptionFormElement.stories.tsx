import DescriptionFormElement from './DescriptionFormElement';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FieldValues, useForm } from 'react-hook-form';
import { TransactionFormData } from '@/types/transaction';
import { ComponentProps } from 'react';
import { CategoryFormData } from '@/types/category';

const meta = {
  title: 'Molecules/DescriptionFormElement',
  component: DescriptionFormElement,
} satisfies Meta<typeof DescriptionFormElement<FieldValues & { description?: string }>>;

export default meta;

export const Transaction: StoryObj<typeof DescriptionFormElement<TransactionFormData>> = {
  render: () => {
    const { control } = useForm<TransactionFormData>({
      defaultValues: {
        description: 'Transaction description',
      } as TransactionFormData,
    });

    type DescriptionProps = ComponentProps<typeof DescriptionFormElement<TransactionFormData>>;

    return <DescriptionFormElement control={control as DescriptionProps['control']} />;
  },
};

export const Category: StoryObj<typeof DescriptionFormElement<CategoryFormData>> = {
  render: () => {
    const { control } = useForm<CategoryFormData>({
      defaultValues: {
        description: 'Category description',
      } as CategoryFormData,
    });

    type DescriptionProps = ComponentProps<typeof DescriptionFormElement<CategoryFormData>>;

    return <DescriptionFormElement control={control as DescriptionProps['control']} />;
  },
};
