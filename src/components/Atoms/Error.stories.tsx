import Error from '@/components/Atoms/Error';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Atoms/Error',
  component: Error,
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: 'Transaction not found',
  },
};
