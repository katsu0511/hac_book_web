import { ControllerRenderProps, ControllerFieldState, FieldValues, Path } from 'react-hook-form';
import { TextField } from '@mui/material';

type InputProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  label: string
  type: React.InputHTMLAttributes<HTMLInputElement>['type']
  autoComplete: string
  fieldState: ControllerFieldState
};

export default function Input<T extends FieldValues>({ field, label, type, autoComplete, fieldState }: InputProps<T>) {
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
          backgroundColor: 'white',
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
