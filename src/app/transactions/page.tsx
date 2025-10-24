'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { getTransactions } from '@/lib/getters';
import { Button } from '@mui/material';
import { deleteTransaction } from '@/lib/actions';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!authenticated) router.replace('/login');
  }, [authenticated, loading, router]);

  const transaction = useCallback(async () => {
    const transactions = await getTransactions();
    if (transactions === undefined) return;
    else if (transactions === null) router.replace('/');
    else setTransactions(transactions);
  }, [router]);

  useEffect(() => {
    transaction();
  }, [transaction]);

  const onDelete = async(id: string) => {
    const deleted = await deleteTransaction(id);
    if (deleted) setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Transaction</h2>
      {transactions.map(transaction => (
        <div key={transaction.id} className='border-4 border-blue-500'>
          <p>Category: {transaction.categoryId}</p>
          <Link href={`/transactions/modify/${transaction.id}`} className='bg-green-200'>{transaction.currency} {transaction.amount}</Link>
          <p>Description: {transaction.description}</p>
          <p>Transaction Date: {transaction.transactionDate}</p>
          <Button
            variant='contained'
            onClick={() => onDelete(transaction.id)}
          >Delete</Button>
        </div>
      ))}
      <Link href={'/transactions/add'} >Add Transaction</Link>
    </div>
  );
}
