'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { useForm, FieldErrors, Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, FormHelperText } from '@mui/material';
import { getParentCategories } from '@/lib/getters';
import { addCategory } from '@/lib/actions';

const defaultValues = {
  parentId: '',
  name: '',
  type: '',
  description: ''
};

export default function AddCategory() {
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const { authenticated, loading } = useAuth();
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<CategoryFormData>({ defaultValues });
  const onsubmit = async (data: CategoryFormData) => {
    const message = await addCategory(data);
    console.log(message);
  };
  const onerror = (err: FieldErrors<CategoryFormData>) => console.log(err);

  useEffect(() => {
    if (loading) return;
    if (!authenticated) router.replace('/login');
  }, [authenticated, loading, router]);

  const parentCategory = useCallback(async () => {
    const categories = await getParentCategories();
    if (categories === undefined) return;
    else if (categories === null) router.replace('/');
    else {
      setParentCategories(categories);
    }
  }, [router]);

  useEffect(() => {
    parentCategory();
  }, [parentCategory]);

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate>
        <FormControl fullWidth error={!!errors.parentId}>
          <InputLabel id='parentId'>Parent Category</InputLabel>
          <Controller
            name='parentId'
            control={control}
            render={({ field }) => (
              <Select {...field} labelId='parentId' label='Parent Category'>
                <MenuItem value=''>-</MenuItem>
                {parentCategories.map(category => (
                  <MenuItem key={category.id} value={category.id}>{`(${(category.type as string).substring(0, 1)}${(category.type as string).substring(1).toLocaleLowerCase()}) ${category.name}`}</MenuItem>
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
                <MenuItem key="expense" value='EXPENSE'>Expense</MenuItem>
                <MenuItem key="income" value='INCOME'>Income</MenuItem>
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
