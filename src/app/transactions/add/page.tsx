'use client';

import { useState, useCallback, useEffect } from 'react';
import { Category } from '@/types/category';
import useAuthState from '@/lib/hooks/useAuthState';
import { useForm, FieldErrors } from 'react-hook-form';
import { getCategories } from '@/lib/api/getters';
import { addTransaction } from '@/lib/api/actions';
import FormTitle from '@/components/Molecules/FormTitle';
import Form from '@/components/Organisms/Form';
import CategorySelect from '@/components/Molecules/CategorySelect';
import AmountFormElement from '@/components/Molecules/AmountFormElement';
import DescriptionFormElement from '@/components/Molecules/DescriptionFormElement';
import TransactionDate from '@/components/Molecules/TransactionDate';
import SubmitButton from '@/components/Molecules/SubmitButton';

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
  const [loadingData, setLoadingData] = useState(true);

  const { loadingState, setLoadingState, error, setError, router } = useAuthState();
  const { control, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({ defaultValues });

  const fetchCategory = useCallback(async () => {
    const categories = await getCategories();
    if (categories === undefined) return;
    else if (categories === null) router.replace('/');
    else {
      setExpenses(categories.expense);
      setIncomes(categories.income);
    }
  }, [router]);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    await fetchCategory();
    setLoadingData(false);
  }, [fetchCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onsubmit = async (data: TransactionFormData) => {
    setLoadingState(true);
    const res = await addTransaction(data);
    if (res.ok) router.replace('/transactions');
    else setError(res.error);
    setLoadingState(false);
  };

  const onerror = (err: FieldErrors<TransactionFormData>) => console.log(err);

  if (loadingData) return <div>Loading...</div>;

  return (
    <>
      <FormTitle title='Add Transaction' link='transactions' linkDisplay='Transactions' />
      <Form onSubmit={handleSubmit(onsubmit, onerror)}>
        <CategorySelect errors={errors} control={control} expenses={expenses} incomes={incomes} />
        <AmountFormElement errors={errors} control={control} />
        <DescriptionFormElement control={control} />
        <TransactionDate errors={errors} control={control} />
        <SubmitButton label='Submit' error={error} loading={loadingState} />
      </Form>
    </>
  );
}
