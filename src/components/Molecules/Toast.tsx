'use client';

import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';

type Props = {
  id?: string
  dialogOpen: boolean
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  snackbarOpen: boolean
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  onDelete: (id?: string | undefined) => Promise<void>
};

export default function Toast({id, dialogOpen, setDialogOpen, snackbarOpen, setSnackbarOpen, onDelete}: Props) {
  return (
    <>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>Are you sure to delete?<br /><strong>This operation cannot be reverted.</strong></DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button color='error' onClick={() => onDelete(id)}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity='success' variant='filled'>Successfully deleted</Alert>
      </Snackbar>
    </>
  );
}
