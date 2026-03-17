import AtomButton from '@/components/Atoms/AtomButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Atoms/Button',
  component: AtomButton,
  args: {
    loading: false,
  },
} satisfies Meta<typeof AtomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Submit',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading…',
    loading: true,
  },
};
