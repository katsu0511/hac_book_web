import { Button } from '@mui/material';

export default function AtomButton({ label, disabled }: { label: string, disabled: boolean }) {
  return (
    <Button type='submit' variant='outlined' color='primary' size='medium' disabled={disabled}>
      {label}
    </Button>
  );
}
