'use client';

import { useState } from 'react';
import useAuthState from '@/lib/hooks/useAuthState';
import { deleteTransaction } from '@/lib/api/actions';
import { Button } from '@mui/material';
import Toast from '@/components/Molecules/Toast';

export default function DetailButtons({id, link}: {id?: string, link: string}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { router } = useAuthState();

  const onMoveToEdit = async(id?: string) => {
    if (id) router.replace(`/${link}/modify/${id}`);
  };

  const onDelete = async(id?: string) => {
    if (!id) return;
    const res = await deleteTransaction(id);
    if (res.ok) {
      setSnackbarOpen(true);
      setTimeout(() => {
        router.replace(`/${link}`);
      }, 1000);
    }
  };

  return (
    <>
      <div className='flex justify-center gap-4 py-10'>
        <Button variant='contained' onClick={() => onMoveToEdit(id)} sx={{ width: 80 }}>Edit</Button>
        {link === 'transactions' && <Button variant='contained' color='error' onClick={() => setDialogOpen(true)} sx={{ width: 80 }}>Delete</Button>}
      </div>
      <Toast id={id} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} onDelete={onDelete} />
    </>
  );
}
