import { FieldErrors, Control, Controller } from 'react-hook-form';
import { CategoryFormData, Category } from '@/types/category';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from '@mui/material';

type Props = {
  errors: FieldErrors<CategoryFormData>
  control: Control<CategoryFormData>
  expenses: Category[]
  incomes: Category[]
};

export default function ParentCategorySelect({ errors, control, expenses, incomes }: Props) {
  return (
    <FormControl margin='normal' error={!!errors.parentId} sx={{ width: 300 }}>
      <InputLabel id='parentId'>Parent Category</InputLabel>
      <Controller
        name='parentId'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value ?? ''}
            labelId='parentId'
            label='Parent Category'
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
            <MenuItem value=''>-</MenuItem>
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
    </FormControl>
  );
}
