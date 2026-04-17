import Dashboard from './Dashboard';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getCurrentMonth, getFirstDayOfCurrentMonth, getToday } from '@/lib/domain/month';

const meta = {
  title: 'Organisms/Dashboard',
  component: Dashboard,
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    month: getCurrentMonth(),
  },
};

export const Summary: Story = {
  args: {
    start: getFirstDayOfCurrentMonth(),
    end: getToday(),
  },
};
