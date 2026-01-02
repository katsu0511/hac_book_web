import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormControl } from '@mui/material';
import Input from '@/components/Atoms/Input';

type Props<T extends FieldValues & WithDescription> = {
  control: Control<T>;
};

type WithDescription = {
  description?: string;
};

export default function DescriptionFormElement<T extends FieldValues & WithDescription>({ control }: Props<T>) {
  return (
    <FormControl fullWidth margin='normal'>
      <Controller
        name={'description' as Path<T>}
        control={control}
        rules={{
          maxLength: {
            value: 200,
            message: 'within 200 letters'
          }
        }}
        render={({ field, fieldState }) => <Input field={field} label='Description' type='text' autoComplete='off' fieldState={fieldState} />}
      />
    </FormControl>
  );
}
