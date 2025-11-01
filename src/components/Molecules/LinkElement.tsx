import { Box } from '@mui/material';
import PageLink from '@/components/Atoms/PageLink';

export default function LinkElement(props: { page: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '40px'
      }}
    >
      <PageLink page={props.page} />
    </Box>
  );
}
