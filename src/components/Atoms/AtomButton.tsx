import { Button } from '@mui/material';

export default function AtomButton({ label, loading, disabled }: { label: string, loading: boolean, disabled: boolean }) {
  return (
    <Button type='submit' variant='outlined' color='primary' size='medium' disabled={disabled}>
      {loading ? 'Loading…' : label}
    </Button>
  );
}
