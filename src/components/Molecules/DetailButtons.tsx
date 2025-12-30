'use client';

import { useState } from 'react';
import useAuthState from '@/lib/hooks/useAuthState';
import { deleteTransaction } from '@/lib/api/actions';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';

export default function DetailButtons({id, link}: {id?: string, link: string}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { router } = useAuthState();

  const onMoveToEdit = async(id?: string) => {
    if (id) router.replace(`/${link}/modify/${id}`);
  };

  const onDelete = async(id?: string) => {
    if (!id) return;
    const deleted = await deleteTransaction(id);
    if (deleted) {
      setSnackbarOpen(true);
      setTimeout(() => {
        router.replace(`/${link}`);
      }, 1000);
    }
  };

  return (
    <>
      <div className='flex justify-center gap-4 my-10'>
        <Button variant='contained' onClick={() => onMoveToEdit(id)} sx={{ width: 80 }}>Edit</Button>
        {link === 'transactions' && <Button variant='contained' color='error' onClick={() => setDialogOpen(true)} sx={{ width: 80 }}>Delete</Button>}
      </div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>Are you sure to delete?<br /><strong>This operation cannot be reverted.</strong></DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={() => onDelete(id)}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success" variant="filled">Successfully deleted</Alert>
      </Snackbar>
    </>
  );
}
