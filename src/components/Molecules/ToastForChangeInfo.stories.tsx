import ToastForChangeInfo from './ToastForChangeInfo';
import { useState } from 'react';
import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/ToastForChangeInfo',
  component: ToastForChangeInfo,
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [dialogOpen, setDialogOpen] = useState(args.dialogOpen);
    const [snackbarOpen, setSnackbarOpen] = useState(args.snackbarOpen);

    const onOpenDialog = () => {
      setDialogOpen(true);
    };

    const handleCancel = () => {
      setDialogOpen(false);
    };

    const changeName = async () => {
      setDialogOpen(false);
      setSnackbarOpen(true);
    };

    return (
      <>
        <Button type='submit' variant='contained' color='primary' size='medium' disabled={false} onClick={() => onOpenDialog()} >Change {args.infoType}</Button>
        <ToastForChangeInfo
          {...args}
          dialogOpen={dialogOpen}
          snackbarOpen={snackbarOpen}
          buttonLoading={false}
          setSnackbarOpen={setSnackbarOpen}
          handleCancel={handleCancel}
          changeName={changeName}
        />
      </>
    );
  },
} satisfies Meta<typeof ToastForChangeInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChangeEmailConfirmation: Story = {
  args: {
    infoType: 'email',
    dialogOpen: true,
    snackbarOpen: false,
    buttonLoading: false,
    setSnackbarOpen: () => {},
    handleCancel: () => {},
    changeName: async () => {},
  },
};

export const ChangePasswordConfirmation: Story = {
  args: {
    infoType: 'password',
    dialogOpen: true,
    snackbarOpen: false,
    buttonLoading: false,
    setSnackbarOpen: () => {},
    handleCancel: () => {},
    changeName: async () => {},
  },
};

export const SuccessChangeEmailSnackbar: Story = {
  args: {
    ...ChangeEmailConfirmation.args,
    dialogOpen: false,
    snackbarOpen: true,
  },
};

export const SuccessChangePasswordSnackbar: Story = {
  args: {
    ...ChangePasswordConfirmation.args,
    dialogOpen: false,
    snackbarOpen: true,
  },
};
