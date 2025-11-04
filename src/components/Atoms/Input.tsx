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
      fullWidth
    />
  );
}
