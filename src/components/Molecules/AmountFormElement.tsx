import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TransactionFormData } from '@/types/transaction';
import { FormControl, TextField } from '@mui/material';

type Props = {
  errors: FieldErrors<TransactionFormData>
  control: Control<TransactionFormData>
};

export default function AmountFormElement({ errors, control }: Props) {
  return (
    <FormControl fullWidth margin='normal'>
      <Controller
        name='amount'
        control={control}
        rules={{
          required: 'amount is required',
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: 'Enter a valid amount with up to 2 decimal places'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Amount'
            type='number'
            autoComplete='off'
            error={!!errors.amount}
            helperText={errors.amount?.message}
            variant='outlined'
            slotProps={{
              htmlInput: {
                step: '0.01',
                min: '0'
              }
            }}
            sx={{
              width: '100%',
              margin: '0 auto',
              '@media (min-width:350px)': {
                width: '300px',
              },
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
        )}
      />
    </FormControl>
  );
}
