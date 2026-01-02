import { FieldErrors, Control, Controller } from 'react-hook-form';
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
        )}
      />
    </FormControl>
  );
}
