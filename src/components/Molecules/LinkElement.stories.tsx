import LinkElement from './LinkElement';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/LinkElement',
  component: LinkElement,
} satisfies Meta<typeof LinkElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Signup: Story = {
  args: {
    page: 'signup',
    display: 'Signup',
  },
};

export const Login: Story = {
  args: {
    page: 'login',
    display: 'Login',
  },
};

export const AddCategory: Story = {
  args: {
    page: 'categories/add',
    display: 'Add Category',
  },
};

export const AddTransaction: Story = {
  args: {
    page: 'transactions/add',
    display: 'Add Transaction',
  },
};
