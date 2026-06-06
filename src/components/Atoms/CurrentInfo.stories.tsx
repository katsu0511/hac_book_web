import CurrentInfo from '@/components/Atoms/CurrentInfo';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Atoms/CurrentInfo',
  component: CurrentInfo,
} satisfies Meta<typeof CurrentInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Name: Story = {
  args: {
    infoType: 'Name',
    info: 'User\'s Name'
  },
};
