'use client';

import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  label: string
  date: Dayjs
  onChange: (newValue: Dayjs) => void
  minDate?: Dayjs
  maxDate?: Dayjs
};

export default function Date({label, date, onChange, minDate, maxDate}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={date}
        onChange={(newValue) => {
          if (newValue) onChange(newValue);
        }}
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: {
            fullWidth: true,
            sx: {
              backgroundColor: 'white',
              width: '100%',
              mx: 0,
              mb: 3,
              '@media (min-width:768px)': {
                width: '300px',
                mx: '10px',
                mb: 0,
              },
              '& fieldset': {
                borderColor: 'primary.main',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
                borderWidth: 2,
                transition: 'all 0.1s',
              },
            },
          }
        }}
      />
    </LocalizationProvider>
  );
}
