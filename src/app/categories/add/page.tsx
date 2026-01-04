'use client';

import { useState, useCallback, useEffect } from 'react';
import { Category, CategoryFormData } from '@/types/category';
import useAuthState from '@/lib/hooks/useAuthState';
import { useForm, FieldErrors } from 'react-hook-form';
import { getParentCategories } from '@/lib/api/getters';
import { addCategory } from '@/lib/api/actions';
import FormTitle from '@/components/Molecules/FormTitle';
import Form from '@/components/Organisms/Form';
import ParentCategorySelect from '@/components/Molecules/ParentCategorySelect';
import NameFormElement from '@/components/Molecules/NameFormElement';
import TypeSelect from '@/components/Molecules/TypeSelect';
import DescriptionFormElement from '@/components/Molecules/DescriptionFormElement';
import SubmitButton from '@/components/Molecules/SubmitButton';

const defaultValues = {
  parentId: '',
  name: '',
  type: '',
  description: ''
};

export default function AddCategory() {
  const [expenses, setExpenses] = useState<Category[]>([]);
  const [incomes, setIncomes] = useState<Category[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const { loadingState, setLoadingState, error, setError, router } = useAuthState();
  const { control, handleSubmit, formState: { errors } } = useForm<CategoryFormData>({ defaultValues });

  const fetchParentCategory = useCallback(async () => {
    const categories = await getParentCategories();
    if (categories === undefined) return;
    else if (categories === null) router.replace('/');
    else {
      setExpenses(categories.expense);
      setIncomes(categories.income);
    }
  }, [router]);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    await fetchParentCategory();
    setLoadingData(false);
  }, [fetchParentCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onsubmit = async (data: CategoryFormData) => {
    setLoadingState(true);
    const res = await addCategory(data);
    if (res.ok) router.replace('/categories');
    else setError(res.error);
    setLoadingState(false);
  };

  const onerror = (err: FieldErrors<CategoryFormData>) => console.log(err);

  if (loadingData) return <div>Loading...</div>;

  return (
    <>
      <FormTitle title='Add Category' />
      <Form onSubmit={handleSubmit(onsubmit, onerror)}>
        <ParentCategorySelect errors={errors} control={control} expenses={expenses} incomes={incomes} />
        <NameFormElement control={control} />
        <TypeSelect errors={errors} control={control} />
        <DescriptionFormElement control={control} />
        <SubmitButton label='Submit' error={error} loading={loadingState} />
      </Form>
    </>
  );
}
