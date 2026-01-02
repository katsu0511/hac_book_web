import { FieldErrors, Control, Controller } from 'react-hook-form';
import { Category } from '@/types/category';
import { FormControl, InputLabel, Select, ListSubheader, MenuItem, FormHelperText } from '@mui/material';

type Props = {
  errors: FieldErrors<TransactionFormData>
  control: Control<TransactionFormData>
  expenses: Category[]
  incomes: Category[]
};

export default function CategorySelect({ errors, control, expenses, incomes }: Props) {
  return (
    <FormControl margin='normal' error={!!errors.categoryId} sx={{ width: 300 }}>
      <InputLabel id='categoryId'>Category</InputLabel>
      <Controller
        name='categoryId'
        control={control}
        rules={{
          required: 'category is required'
        }}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value ?? ''}
            labelId='categoryId'
            label='Category'
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
            <ListSubheader key='expense'>Expense</ListSubheader>
            {expenses.map(expense => (
              <MenuItem key={expense.id} value={expense.id}>{expense.name}</MenuItem>
            ))}
            <ListSubheader key='income'>Income</ListSubheader>
            {incomes.map(income => (
              <MenuItem key={income.id} value={income.id}>{income.name}</MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText error={'categoryId' in errors}>{errors.categoryId?.message}</FormHelperText>
    </FormControl>
  );
}
