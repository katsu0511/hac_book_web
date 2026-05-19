import DrawerButton from '@/components/Atoms/DrawerButton';
import { Disclosure } from '@headlessui/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Atoms/DrawerButton',
  component: DrawerButton,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <Disclosure>
        <nav className='flex flex-col gap-4 p-4'>
          <Story />
        </nav>
      </Disclosure>
    ),
  ],
} satisfies Meta<typeof DrawerButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    link: '',
    display: 'Home',
  },
};

export const Profile: Story = {
  args: {
    link: 'profile',
    display: 'Profile',
  },
};
