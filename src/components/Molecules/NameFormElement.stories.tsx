import NameFormElement from './NameFormElement';
import { Control, useForm } from 'react-hook-form';
import { CategoryFormData } from '@/types/category';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/NameFormElement',
  component: NameFormElement,
  args: {
    control: {} as Control<CategoryFormData>,
  },
} satisfies Meta<typeof NameFormElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CategoryName: Story = {
  render: () => {
    const { control } = useForm<CategoryFormData>({
      defaultValues: {
        name: '',
      } as CategoryFormData,
    });

    return <NameFormElement control={control} />;
  },
};
