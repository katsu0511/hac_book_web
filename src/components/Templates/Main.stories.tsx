import Main from './Main';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Dashboard from '@/components/Organisms/Dashboard';

const meta = {
  title: 'Templates/Main',
  component: Main,
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <Main {...args}>
        <Dashboard month='January' />
      </Main>
    );
  },
  args: {
    children: null,
  },
};
