import { FieldErrors, Control, Controller } from 'react-hook-form';
import { CategoryFormData } from '@/types/category';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

type Props = {
  errors: FieldErrors<CategoryFormData>
  control: Control<CategoryFormData>
};

export default function TypeSelect({ errors, control }: Props) {
  return (
    <FormControl
      margin='normal'
      error={!!errors.type}
      sx={{
        width: '100%',
        '@media (min-width:350px)': {
          width: 300,
        },
      }}
    >
      <InputLabel id='type'>Type</InputLabel>
      <Controller
        name='type'
        control={control}
        rules={{ required: 'type is required' }}
        render={({ field }) => (
          <Select
            {...field}
            labelId='type'
            label='Type'
            sx={{
              '& .MuiSelect-select': {
                backgroundColor: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
                transition: 'all 0.1s',
              },
            }}
          >
            <MenuItem key='expense' value='EXPENSE'>Expense</MenuItem>
            <MenuItem key='income' value='INCOME'>Income</MenuItem>
          </Select>
        )}
      />
      <FormHelperText error={'type' in errors}>{errors.type?.message}</FormHelperText>
    </FormControl>
  );
}
