import { FieldErrors, Control, Controller } from 'react-hook-form';
import { TransactionFormData } from '@/types/transaction';
import { FormControl, TextField } from '@mui/material';

type Props = {
  errors: FieldErrors<TransactionFormData>
  control: Control<TransactionFormData>
};

export default function TransactionDate({ errors, control }: Props) {
  return (
    <FormControl fullWidth margin='normal'>
      <Controller
        name='transactionDate'
        control={control}
        rules={{
          required: 'transaction date is required'
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Transaction Date'
            type='date'
            autoComplete='off'
            error={!!errors.transactionDate}
            helperText={errors.transactionDate?.message}
            variant='outlined'
            slotProps={{inputLabel: { shrink: true} }}
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
