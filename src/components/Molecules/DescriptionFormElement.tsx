import { Control, Controller } from 'react-hook-form';
import { FormControl } from '@mui/material';
import Input from '@/components/Atoms/Input';
import { CategoryFormData } from '@/types/category';

export default function DescriptionFormElement({ control }: { control: Control<CategoryFormData> }) {
  return (
    <FormControl fullWidth margin='normal'>
      <Controller
        name='description'
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
