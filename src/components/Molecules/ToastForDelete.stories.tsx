import ToastForDelete from './ToastForDelete';
import { useState } from 'react';
import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Molecules/ToastForDelete',
  component: ToastForDelete,
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [dialogOpen, setDialogOpen] = useState(args.dialogOpen);
    const [snackbarOpen, setSnackbarOpen] = useState(args.snackbarOpen);

    const onOpenDialog = () => {
      setDialogOpen(true);
    };

    const onDelete = async(id?: string) => {
      if (!id) return;
      setDialogOpen(false);
      setSnackbarOpen(true);
    };

    return (
      <>
        <Button variant='contained' color='error' onClick={() => onOpenDialog()} sx={{ width: 80, height: 40, my: '10px' }}>Delete</Button>
        <ToastForDelete
          {...args}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
          onDelete={onDelete}
        />
      </>
    );
  },
} satisfies Meta<typeof ToastForDelete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteConfirmation: Story = {
  args: {
    id: '1',
    dialogOpen: true,
    snackbarOpen: false,
    setDialogOpen: () => {},
    setSnackbarOpen: () => {},
    onDelete: async () => {},
  },
};

export const SuccessSnackbar: Story = {
  args: {
    ...DeleteConfirmation.args,
    dialogOpen: false,
    snackbarOpen: true,
  },
};
