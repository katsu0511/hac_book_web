import PageLink from '@/components/Atoms/PageLink';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Atoms/PageLink',
  component: PageLink,
} satisfies Meta<typeof PageLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: 'login',
    display: 'Login'
  },
};
