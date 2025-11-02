import { Box } from '@mui/material';
import Error from '@/components/Atoms/Error';
import AtomButton from '@/components/Atoms/AtomButton'

export default function SubmitButton({ action, error, loading }: { action: string, error: string, loading: boolean }) {
  return (
    <Box py={2} textAlign='center'>
      {error && <Error error={error} />}
      <AtomButton action={loading ? 'Loading…' : action} disabled={loading} />
    </Box>
  );
}
