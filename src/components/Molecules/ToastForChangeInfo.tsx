'use client';

import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';

type Props = {
  infoType: string
  dialogOpen: boolean
  snackbarOpen: boolean
  buttonLoading: boolean
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  handleCancel: () => void
  changeName: () => Promise<void>
};

export default function ToastForChangeInfo({ infoType, dialogOpen, snackbarOpen, buttonLoading, setSnackbarOpen, handleCancel, changeName }: Props) {
  return (
    <>
      <Dialog open={dialogOpen} onClose={handleCancel}>
        <DialogTitle>Change Confirmation</DialogTitle>
        <DialogContent>Are you sure to change your {infoType}? <strong className='text-red-500'>After this process, you will logged out. Please login again.</strong></DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color='error' disabled={buttonLoading}>Cancel</Button>
          <Button onClick={changeName} color='primary' autoFocus disabled={buttonLoading}>OK</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity='success' variant='filled'>Successfully changed your {infoType}</Alert>
      </Snackbar>
    </>
  );
}
