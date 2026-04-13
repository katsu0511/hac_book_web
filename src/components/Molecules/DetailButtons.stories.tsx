import DetailButtons from './DetailButtons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/DetailButtons',
  component: DetailButtons,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof DetailButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {
  args: {
    id: '1',
    link: 'categories',
  },
};

export const Transaction: Story = {
  args: {
    id: '1',
    link: 'transactions',
  },
};
