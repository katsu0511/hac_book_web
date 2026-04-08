import SubmitButton from './SubmitButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/SubmitButton',
  component: SubmitButton,
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    label: 'Login',
    error: '',
    loading: false,
  },
};

export const LoginFailed: Story = {
  args: {
    label: 'Login',
    error: 'Failed to login.',
    loading: false,
  },
};

export const Signup: Story = {
  args: {
    label: 'Signup',
    error: '',
    loading: false,
  },
};

export const PasswordNotMatch: Story = {
  args: {
    label: 'Signup',
    error: 'Password doesn\'t match',
    loading: false,
  },
};

export const SignupFailed: Story = {
  args: {
    label: 'Signup',
    error: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one of them @$!%*?& and 8 to 64 letters',
    loading: false,
  },
};

export const Submit: Story = {
  args: {
    label: 'Submit',
    error: '',
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    label: 'Submit',
    error: '',
    loading: true,
  },
};
