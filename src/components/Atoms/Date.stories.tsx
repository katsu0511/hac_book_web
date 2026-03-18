import Date from '@/components/Atoms/Date';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import { getFirstDayOfCurrentMonth, getToday } from '@/lib/domain/month';
import dayjs from 'dayjs';

const meta = {
  title: 'Atoms/Date',
  component: Date,
  args: {
    onChange: () => {},
  },
  argTypes: {
    date: { control: false },
    minDate: { control: false },
    maxDate: { control: false },
  }
} satisfies Meta<typeof Date>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <Date
        {...args}
        onChange={(newDate) => {
          updateArgs({ date: newDate })
        }}
      />
    );
  },
  args: {
    label: 'Start date',
    date: getFirstDayOfCurrentMonth(),
  }
};

export const WithRange: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <Date
        {...args}
        onChange={(newDate) => {
          updateArgs({ date: newDate })
        }}
      />
    );
  },
  args: {
    label: 'End date',
    date: getToday(),
    minDate: dayjs().subtract(1, 'year'),
    maxDate: dayjs().add(1, 'year'),
  },
};
