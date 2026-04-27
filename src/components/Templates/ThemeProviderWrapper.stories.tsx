import ThemeProviderWrapper from './ThemeProviderWrapper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Header from '@/components/Organisms/Header';
import Main from '@/components/Templates/Main';
import Dashboard from '@/components/Organisms/Dashboard';
import Footer from '@/components/Organisms/Footer';

const meta = {
  title: 'Templates/ThemeProviderWrapper',
  component: ThemeProviderWrapper,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof ThemeProviderWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <ThemeProviderWrapper {...args}>
        <Header />
        <Main>
          <Dashboard month='January' />
        </Main>
        <Footer />
      </ThemeProviderWrapper>
    );
  },
  args: {
    children: null,
  },
};
