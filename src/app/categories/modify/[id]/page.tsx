'use client';

import { CategoryFormData, Category } from '@/types/category';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm, FieldErrors, Controller } from 'react-hook-form';
import { getCategoryForEdit } from '@/lib/api/getters';
import { modifyCategory } from '@/lib/api/actions';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader, TextField, FormHelperText, Button } from '@mui/material';

const defaultValues: CategoryFormData = {
  id: '',
  parentId: '',
  name: '',
  type: '',
  description: ''
};

export default function ModifyCategory() {
  const [expenses, setExpenses] = useState<Category[]>([]);
  const [incomes, setIncomes] = useState<Category[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<CategoryFormData>({ defaultValues });

  const fetchCategoryForEdit = useCallback(async () => {
    const categoryForEdit = await getCategoryForEdit(id as string);
    if (categoryForEdit === undefined) return;
    else if (categoryForEdit === null) router.replace('/');
    else {
      reset({
        id: categoryForEdit.category.id,
        parentId: categoryForEdit.category.parentId,
        name: categoryForEdit.category.name,
        type: categoryForEdit.category.type,
        description: categoryForEdit.category.description
      });
      setExpenses(categoryForEdit.categories.expense);
      setIncomes(categoryForEdit.categories.income);
    }
  }, [id, router, reset]);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    await fetchCategoryForEdit();
    setLoadingData(false);
  }, [fetchCategoryForEdit]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onsubmit = async (data: CategoryFormData) => {
    const message = await modifyCategory(data);
    console.log(message);
  };

  const onerror = (err: FieldErrors<CategoryFormData>) => console.log(err);

  if (loadingData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Modify Category</h2>
      <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate>
        <FormControl fullWidth error={!!errors.parentId}>
          <InputLabel id='parentId'>Parent Category</InputLabel>
          <Controller
            name='parentId'
            control={control}
            render={({ field }) => (
              <Select {...field} value={field.value ?? ''} labelId='parentId' label='Parent Category'>
                <MenuItem value=''>-</MenuItem>
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
        <FormControl fullWidth error={!!errors.name}>
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'name is required',
              maxLength: {
                value: 100,
                message: 'within 100 letters'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Name'
                margin='normal'
                error={'name' in errors}
                helperText={errors.name?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.type}>
          <InputLabel id='type'>Type</InputLabel>
          <Controller
            name='type'
            control={control}
            rules={{ required: 'type is required' }}
            render={({ field }) => (
              <Select {...field} labelId='type' label='Type'>
                <MenuItem key='expense' value='EXPENSE'>Expense</MenuItem>
                <MenuItem key='income' value='INCOME'>Income</MenuItem>
              </Select>
            )}
          />
          <FormHelperText error={'type' in errors}>{errors.type?.message}</FormHelperText>
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
                error={'description' in errors}
                helperText={errors.description?.message}
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
