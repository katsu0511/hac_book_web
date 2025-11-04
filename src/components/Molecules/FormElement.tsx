import { Control, Controller } from 'react-hook-form';
import { FormControl } from '@mui/material';
import Input from '@/components/Atoms/Input';

type FormElementProps = {
  name: keyof AuthFormData
  label: string
  type: React.InputHTMLAttributes<HTMLInputElement>['type']
  autoComplete: string;
  control: Control<AuthFormData>
};

export default function FormElement({ name, label, type, control, autoComplete }: FormElementProps) {
  return (
    <FormControl fullWidth margin='normal'>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field, fieldState }) => <Input field={field} label={label} type={type} autoComplete={autoComplete} fieldState={fieldState} />}
      />
    </FormControl>
  );
}
