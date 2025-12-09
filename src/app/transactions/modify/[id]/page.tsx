'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm, FieldErrors, Controller } from 'react-hook-form';
import { getTransactionForEdit } from '@/lib/api/getters';
import { modifyTransaction } from '@/lib/api/actions';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader, TextField, Button } from '@mui/material';

const defaultValues: TransactionFormData = {
  id: '',
  categoryId: '',
  amount: '',
  currency: 'CAD',
  description: '',
  transactionDate: ''
};

export default function ModifyTransaction() {
  const [expenses, setExpenses] = useState<Category[]>([]);
  const [incomes, setIncomes] = useState<Category[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<TransactionFormData>({ defaultValues });

  const fetchTransactionForEdit = useCallback(async () => {
    const transactionForEdit = await getTransactionForEdit(id as string);
    if (transactionForEdit === undefined) return;
    else if (transactionForEdit === null) return router.replace('/');
    reset({
      id: transactionForEdit.transaction.id,
      categoryId: transactionForEdit.transaction.categoryId,
      amount: transactionForEdit.transaction.amount,
      currency: transactionForEdit.transaction.currency,
      description: transactionForEdit.transaction.description ?? '',
      transactionDate: transactionForEdit.transaction.transactionDate
    });
    setExpenses(transactionForEdit.categories.expense);
    setIncomes(transactionForEdit.categories.income);
  }, [id, router, reset]);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    await fetchTransactionForEdit();
    setLoadingData(false);
  }, [fetchTransactionForEdit]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onsubmit = async (data: TransactionFormData) => {
    const transaction = await modifyTransaction(data);
    console.log(transaction);
  };

  const onerror = (err: FieldErrors<TransactionFormData>) => console.log(err);

  if (loadingData) return <div>Loading...</div>;

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
              <Select {...field} value={field.value ?? ''} labelId='categoryId' label='Category'>
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
