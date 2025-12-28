import { FormEvent } from 'react';
import { Box } from '@mui/material';

type FormProps = {
  children: React.ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
};

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <Box
      width='100%'
      component='form'
      onSubmit={onSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}
