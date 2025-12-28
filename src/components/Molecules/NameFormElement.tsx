import { Control, Controller } from 'react-hook-form';
import { FormControl } from '@mui/material';
import Input from '@/components/Atoms/Input';
import { CategoryFormData } from '@/types/category';

export default function NameFormElement({ control }: { control: Control<CategoryFormData> }) {
  return (
    <FormControl fullWidth margin='normal'>
      <Controller
        name='name'
        control={control}
        rules={{
          required: 'name is required',
          maxLength: {
            value: 100,
            message: 'within 100 letters'
          }
        }}
        render={({ field, fieldState }) => <Input field={field} label='Name' type='text' autoComplete='off' fieldState={fieldState} />}
      />
    </FormControl>
  );
}
