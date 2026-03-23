import LogoutButton from '@/components/Atoms/LogoutButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Atoms/LogoutButton',
  component: LogoutButton,
} satisfies Meta<typeof LogoutButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    className: '!block',
    onLogout: fn(async () => {
      console.log('Logout!');
    }),
  },
};
