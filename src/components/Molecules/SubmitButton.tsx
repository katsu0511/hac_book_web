import { Box } from '@mui/material';
import Error from '@/components/Atoms/Error';
import AtomButton from '@/components/Atoms/AtomButton'

export default function SubmitButton({ label, error, loading }: { label: string, error: string, loading: boolean }) {
  return (
    <Box py={2} textAlign='center'>
      {error && <Error error={error} />}
      <AtomButton label={loading ? 'Loading…' : label} disabled={loading} />
    </Box>
  );
}
