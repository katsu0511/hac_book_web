import { FormEvent } from 'react';
import { Box } from '@mui/material';

type FormProps = {
  children: React.ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
};

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <Box width='100%' height='100%' component='form' onSubmit={onSubmit}>
      {children}
    </Box>
  );
}
