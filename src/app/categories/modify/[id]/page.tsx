'use client';

import { CategoryFormData, Category, CategoryForEdit } from '@/types/category';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useAuthState from '@/lib/hooks/useAuthState';
import { useForm, FieldErrors } from 'react-hook-form';
import { getCategoryForEdit } from '@/lib/api/getters';
import { modifyCategory } from '@/lib/api/actions';
import FormTitle from '@/components/Molecules/FormTitle';
import Form from '@/components/Organisms/Form';
import ParentCategorySelect from '@/components/Molecules/ParentCategorySelect';
import NameFormElement from '@/components/Molecules/NameFormElement';
import TypeSelect from '@/components/Molecules/TypeSelect';
import DescriptionFormElement from '@/components/Molecules/DescriptionFormElement';
import SubmitButton from '@/components/Molecules/SubmitButton';

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

  const { loadingState, setLoadingState, error, setError, router } = useAuthState();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<CategoryFormData>({ defaultValues });

  const fetchCategoryForEdit = useCallback(async () => {
    const result = await getCategoryForEdit(id as string);
    if (!result.ok) console.log(result.error);
    else {
      const categoryForEdit: CategoryForEdit = await result.response.json();
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
  }, [id, reset]);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    await fetchCategoryForEdit();
    setLoadingData(false);
  }, [fetchCategoryForEdit]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onsubmit = async (data: CategoryFormData) => {
    setLoadingState(true);
    const res = await modifyCategory(data);
    if (res.ok) router.replace('/categories');
    else setError(res.error);
    setLoadingState(false);
  };

  const onerror = (err: FieldErrors<CategoryFormData>) => console.log(err);

  if (loadingData) return <div>Loading...</div>;

  return (
    <div>
      <FormTitle title='Modify Category' />
      <Form onSubmit={handleSubmit(onsubmit, onerror)}>
        <ParentCategorySelect errors={errors} control={control} expenses={expenses} incomes={incomes} />
        <NameFormElement control={control} />
        <TypeSelect errors={errors} control={control} />
        <DescriptionFormElement control={control} />
        <SubmitButton label='Submit' error={error} loading={loadingState} />
      </Form>
    </div>
  );
}
