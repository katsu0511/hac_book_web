import Input from '@/components/Atoms/Input';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ReactElement } from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  useForm
} from 'react-hook-form';

type InputStoryProps = Omit<
  React.ComponentProps<typeof Input>,
  "field" | "fieldState"
>;

const meta = {
  title: 'Atoms/Input',
  component: Input as unknown as React.ComponentType<InputStoryProps>
} satisfies Meta<InputStoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FormWrapper>
      {(props) => (
        <Input
          {...props}
          {...args}
        />
      )}
    </FormWrapper>
  ),
  args: {
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
  },
};

type FormValues = {
  email: string;
};

function FormWrapper({
  children,
}: {
  children: (props: {
    field: ControllerRenderProps<FormValues, 'email'>;
    fieldState: ControllerFieldState;
  }) => ReactElement;
}) {
  const { control } = useForm<FormValues>({
    defaultValues: { email: '' },
  });

  return (
    <Controller
      name="email"
      control={control}
      render={children}
    />
  );
}
