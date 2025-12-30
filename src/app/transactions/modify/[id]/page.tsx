'use client';

import { useState, useCallback, useEffect } from 'react';
import { Category } from '@/types/category';
import { useParams } from 'next/navigation';
import useAuthState from '@/lib/hooks/useAuthState';
import { useForm, FieldErrors } from 'react-hook-form';
import { getTransactionForEdit } from '@/lib/api/getters';
import { modifyTransaction } from '@/lib/api/actions';
import FormTitle from '@/components/Molecules/FormTitle';
import Form from '@/components/Organisms/Form';
import CategorySelect from '@/components/Molecules/CategorySelect';
import AmountFormElement from '@/components/Molecules/AmountFormElement';
import DescriptionFormElement from '@/components/Molecules/DescriptionFormElement';
import TransactionDate from '@/components/Molecules/TransactionDate';
import SubmitButton from '@/components/Molecules/SubmitButton';

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

  const { loadingState, setLoadingState, error, setError, router } = useAuthState();
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
    setLoadingState(true);
    const res = await modifyTransaction(data);
    if (res.ok) router.replace('/transactions');
    else setError(res.error);
    setLoadingState(false);
  };

  const onerror = (err: FieldErrors<TransactionFormData>) => console.log(err);

  if (loadingData) return <div>Loading...</div>;

  return (
    <>
      <FormTitle title='Modify Transaction' link='transactions' linkDisplay='Transactions' />
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
