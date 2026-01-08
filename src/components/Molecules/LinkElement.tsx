import { Box } from '@mui/material';
import PageLink from '@/components/Atoms/PageLink';

export default function LinkElement({page, display}: { page: string, display: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '40px',
        mb: '16px'
      }}
    >
      <PageLink page={page} display={display} />
    </Box>
  );
}
