import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';
import { TextField } from '@mui/material';

type InputProps = {
  field: ControllerRenderProps<AuthFormData, keyof AuthFormData>
  label: string
  type: React.InputHTMLAttributes<HTMLInputElement>['type']
  autoComplete: string
  fieldState: ControllerFieldState
};

export default function Input({ field, label, type, autoComplete, fieldState }: InputProps) {
  return (
    <TextField
      {...field}
      label={label}
      type={type}
      autoComplete={autoComplete}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      variant='outlined'
      sx={{
        width: '300px',
        margin: '0 auto',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'primary.main',
          },
          '&:hover fieldset': {
            borderColor: 'primary.main',
            borderWidth: 2,
            transition: 'all 0.1s',
          },
        },
      }}
    />
  );
}
