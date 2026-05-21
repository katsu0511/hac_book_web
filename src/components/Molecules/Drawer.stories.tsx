import Drawer from '@/components/Molecules/Drawer';
import { Disclosure } from '@headlessui/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/Drawer',
  component: Drawer,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <Disclosure>
        <Story />
      </Disclosure>
    ),
  ],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isTesting: true,
  },
};
