import { Typography } from '@mui/material';

export default function Error(props: { error: string }) {
  return (
    <Typography color='error' fontWeight='bold' mb={2}>
      {props.error}
    </Typography>
  );
}
