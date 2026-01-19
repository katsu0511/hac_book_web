'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getTransaction } from '@/lib/api/getters';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import FormTitle from '@/components/Molecules/FormTitle';
import Row from '@/components/Atoms/Row';
import DetailButtons from '@/components/Molecules/DetailButtons';

export default function TransactionDetails() {
  const [transaction, setTransaction] = useState<Transaction>();
  const [loadingData, setLoadingData] = useState(true);

  const params = useParams();
  const id = params?.id;

  const fetchTransaction = useCallback(async () => {
    const result = await getTransaction(id as string);
    if (!result.ok) console.log(result.error);
    else {
      const res = await result.response.json();
      setTransaction(res);
    }
  }, [id]);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    await fetchTransaction();
    setLoadingData(false);
  }, [fetchTransaction]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loadingData) return <div>Loading...</div>;

  return (
    <AuthRedirectToLogin>
      <div>
        <FormTitle title='Transaction Details' />
        <div className='w-full h-full md:max-w-screen-md mx-auto mt-10'>
          <Row head='Category' body={transaction?.categoryName ?? ''} />
          <Row head='Amount' body={`$${transaction?.amount}`} />
          <Row head='Transaction Date' body={transaction?.transactionDate ?? ''} />
          <Row head='Description' body={transaction?.description ?? ''} />
        </div>
        <DetailButtons id={transaction?.id} link='transactions' />
      </div>
    </AuthRedirectToLogin>
  );
}
