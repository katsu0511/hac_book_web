import LoginForm from './LoginForm';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
      },
    },
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
