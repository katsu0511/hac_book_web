import TypeSelect from './TypeSelect';
import { FieldErrors, Control, useForm } from 'react-hook-form';
import { CategoryFormData } from '@/types/category';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/TypeSelect',
  component: TypeSelect,
  args: {
    errors: {} as FieldErrors<CategoryFormData>,
    control: {} as Control<CategoryFormData>,
  },
  render: () => {
    const { control, formState: { errors } } = useForm<CategoryFormData>({
      defaultValues: {
        type: '',
      },
      mode: 'onChange',
    });

    return <TypeSelect control={control} errors={errors} />;
  },
} satisfies Meta<typeof TypeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
