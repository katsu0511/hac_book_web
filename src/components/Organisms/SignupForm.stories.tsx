import SignupForm from './SignupForm';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Organisms/SignupForm',
  component: SignupForm,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/signup',
      },
    },
  },
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
