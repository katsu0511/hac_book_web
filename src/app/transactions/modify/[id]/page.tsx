'use client';

import { useParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { useForm, FieldErrors, Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { getMyCategories, getTransaction } from '@/lib/api/getters';
import { modifyTransaction } from '@/lib/api/actions';

export default function ModifyTransaction() {
  const params = useParams();
  const id = params?.id;
  const defaultValues = useMemo(() => ({
    id: '',
    categoryId: '',
    amount: '',
    currency: 'CAD',
    description: '',
    transactionDate: ''
  }), []);
  const [expenses, setExpenses] = useState<Category[]>([]);
  const [incomes, setIncomes] = useState<Category[]>([]);
  const [modifiedTransaction, setModifiedTransaction] = useState<Transaction>();
  const { authenticated, loading } = useAuth();
  const router = useRouter();
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<TransactionFormData>({ defaultValues });
  const onsubmit = async (data: TransactionFormData) => {
    const transaction = await modifyTransaction(data);
    console.log(transaction);
  };
  const onerror = (err: FieldErrors<TransactionFormData>) => console.log(err);

  useEffect(() => {
    if (modifiedTransaction) {
      setValue('id', modifiedTransaction.id);
      setValue('categoryId', modifiedTransaction.categoryId);
      setValue('amount', modifiedTransaction.amount);
      setValue('currency', modifiedTransaction.currency);
      setValue('description', modifiedTransaction.description ?? defaultValues.description);
      setValue('transactionDate', modifiedTransaction.transactionDate);
    }
  }, [modifiedTransaction, setValue, defaultValues]);

  useEffect(() => {
    if (loading) return;
    if (!authenticated) router.replace('/login');
  }, [authenticated, loading, router]);

  const category = useCallback(async () => {
    const categories = await getMyCategories();
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

  const transaction = useCallback(async () => {
      const transaction = await getTransaction(id as string);
      if (transaction === undefined) return;
      else if (transaction === null) router.replace('/');
      else setModifiedTransaction(transaction);
    }, [id, router]);

    useEffect(() => {
      if (id) transaction();
    }, [id, transaction]);

  return (
    <div>
      <h2>Modify Transaction</h2>
      <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate>
        <FormControl fullWidth error={!!errors.categoryId}>
          <InputLabel id='categoryId'>Category</InputLabel>
          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => (
              <Select {...field} labelId='categoryId' label='Category'>
                {expenses.map(expense => (
                  <MenuItem key={expense.id} value={expense.id}>{`(${(expense.type as string).substring(0, 1)}${(expense.type as string).substring(1).toLocaleLowerCase()}) ${expense.name}`}</MenuItem>
                ))}
                {incomes.map(income => (
                  <MenuItem key={income.id} value={income.id}>{`(${(income.type as string).substring(0, 1)}${(income.type as string).substring(1).toLocaleLowerCase()}) ${income.name}`}</MenuItem>
                ))}
              </Select>
            )}
          />
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
