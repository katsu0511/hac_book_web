import { Button } from '@mui/material';

export default function AtomButton({ label, loading }: { label: string, loading: boolean }) {
  return (
    <Button type='submit' variant='contained' color='primary' size='medium' disabled={loading}>
      {loading ? 'Loading…' : label}
    </Button>
  );
}
