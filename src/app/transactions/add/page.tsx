'use client';

import { useState, useCallback, useEffect } from 'react';
import { Category, Categories } from '@/types/category';
import useAuthState from '@/lib/hooks/useAuthState';
import { useForm, FieldErrors } from 'react-hook-form';
import { TransactionFormData } from '@/types/transaction';
import { getCategories } from '@/lib/api/getters';
import { addTransaction } from '@/lib/api/actions';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
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

  const { buttonLoading, setButtonLoading, error, setError, router } = useAuthState();
  const { control, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({ defaultValues });

  const fetchCategories = useCallback(async () => {
    const result = await getCategories();
    if (!result.ok) console.log(result.error);
    else {
      const categories: Categories = await result.response.json();
      setExpenses(categories.expense);
      setIncomes(categories.income);
    }
  }, []);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    await fetchCategories();
    setLoadingData(false);
  }, [fetchCategories]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onsubmit = async (data: TransactionFormData) => {
    setButtonLoading(true);
    const res = await addTransaction(data);
    if (res.ok) router.replace('/transactions');
    else setError(res.error);
    setButtonLoading(false);
  };

  const onerror = (err: FieldErrors<TransactionFormData>) => console.log(err);

  if (loadingData) return <div>Loading...</div>;

  return (
    <AuthRedirectToLogin>
      <FormTitle title='Add Transaction' />
      <Form onSubmit={handleSubmit(onsubmit, onerror)}>
        <CategorySelect errors={errors} control={control} expenses={expenses} incomes={incomes} />
        <AmountFormElement errors={errors} control={control} />
        <DescriptionFormElement control={control} />
        <TransactionDate errors={errors} control={control} />
        <SubmitButton label='Submit' error={error} loading={buttonLoading} />
      </Form>
    </AuthRedirectToLogin>
  );
}
