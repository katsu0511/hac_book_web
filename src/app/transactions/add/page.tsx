'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FieldErrors, Controller } from 'react-hook-form';
import { addTransaction } from '@/lib/api/actions';
import { getCategories } from '@/lib/api/getters';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader, TextField, FormHelperText, Button } from '@mui/material';

const defaultValues = {
  categoryId: '',
  amount: '',
  currency: 'CAD',
  description: '',
  transactionDate: new Date().toISOString().split('T')[0]
};

export default function AddTransaction() {
  const [expenses, setExpenses] = useState<Category[]>([]);
  const [incomes, setIncomes] = useState<Category[]>([]);

  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({ defaultValues });
  const onsubmit = async (data: TransactionFormData) => {
    const transaction = await addTransaction(data);
    console.log(transaction);
  };
  const onerror = (err: FieldErrors<TransactionFormData>) => console.log(err);

  const category = useCallback(async () => {
    const categories = await getCategories();
    if (categories === undefined) return;
    else if (categories === null) router.replace('/');
    else {
      if (categories.expense) setExpenses(categories.expense);
      if (categories.income) setIncomes(categories.income);
    }
  }, [router]);

  useEffect(() => {
    category();
  }, [category]);

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate>
        <FormControl fullWidth error={!!errors.categoryId}>
          <InputLabel id='categoryId'>Category</InputLabel>
          <Controller
            name='categoryId'
            control={control}
            rules={{
              required: 'category is required'
            }}
            render={({ field }) => (
              <Select {...field} labelId='categoryId' label='Category'>
                <ListSubheader key='expense'>Expense</ListSubheader>,
                {expenses.map(expense => (
                  <MenuItem key={expense.id} value={expense.id}>{expense.name}</MenuItem>
                ))}
                <ListSubheader key='income'>Income</ListSubheader>,
                {incomes.map(income => (
                  <MenuItem key={income.id} value={income.id}>{income.name}</MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error={'categoryId' in errors}>{errors.categoryId?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.amount}>
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
                type='number'
                label='Amount'
                margin='normal'
                slotProps={{
                  htmlInput: {
                    step: '0.01',
                    min: '0'
                  }
                }}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.description}>
          <Controller
            name='description'
            control={control}
            rules={{
              maxLength: {
                value: 200,
                message: 'within 200 letters'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Description'
                multiline
                margin='normal'
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.transactionDate}>
          <Controller
            name='transactionDate'
            control={control}
            rules={{
              required: 'transaction date is required'
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type='date'
                label='Transaction Date'
                slotProps={{inputLabel: { shrink: true} }}
                margin='normal'
                error={!!errors.transactionDate}
                helperText={errors.transactionDate?.message}
              />
            )}
          />
        </FormControl>
        <div>
          <Button variant='contained' type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  );
}
