import AuthFormElement from './AuthFormElement';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Control, useForm } from 'react-hook-form';

const meta = {
  title: 'Molecules/AuthFormElement',
  component: AuthFormElement,
  args: {
    control: {} as Control<AuthFormData>,
  },
  render: (args) => {
    const { control } = useForm<AuthFormData>({
      defaultValues: {
        email: '',
        password: ''
      }
    });

    return <AuthFormElement {...args} control={control} />;
  },
} satisfies Meta<typeof AuthFormElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Name: Story = {
  args: {
    name: 'name',
    label: 'Name',
    type: 'text',
    autoComplete: 'name',
  },
};

export const Email: Story = {
  args: {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
  },
};

export const Password: Story = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    autoComplete: 'current-password',
  },
};

export const PasswordConfirmation: Story = {
  args: {
    name: 'passwordConfirm',
    label: 'Password Confirmation',
    type: 'password',
    autoComplete: 'new-password',
  },
};
