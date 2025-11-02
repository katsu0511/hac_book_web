import { Button } from '@mui/material';

export default function AtomButton({ action, disabled }: { action: string, disabled: boolean }) {
  return (
    <Button type='submit' variant='outlined' color='primary' size='medium' disabled={disabled}>
      {action}
    </Button>
  );
}
