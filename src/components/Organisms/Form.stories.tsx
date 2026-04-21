import Form from './Form';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { TransactionFormData } from '@/types/transaction';
import DescriptionFormElement from '../Molecules/DescriptionFormElement';
import TransactionDate from '../Molecules/TransactionDate';
import SubmitButton from '../Molecules/SubmitButton';

const meta = {
  title: 'Organisms/Form',
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const { control, formState: { errors } } = useForm<TransactionFormData>({
      defaultValues: {
        description: '',
        transactionDate: '',
      },
      mode: 'onChange',
    });

    return (
      <Form {...args}>
        <DescriptionFormElement control={control} />
        <TransactionDate errors={errors} control={control} />
        <SubmitButton label='Submit' error='' loading={false} />
      </Form>
    );
  },
  args: {
    children: null,
    onSubmit: (e) => e.preventDefault(),
  },
};
