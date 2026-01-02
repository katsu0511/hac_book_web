'use client';

import { getCurrentMonth } from '@/lib/domain/month';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import { getTransactions } from '@/lib/api/getters';
import { deleteTransaction } from '@/lib/api/actions';
import TitleLine from '@/components/Molecules/TitleLine';
import LinkElement from '@/components/Molecules/LinkElement';
import Toast from '@/components/Molecules/Toast';

const month = getCurrentMonth();

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [id, setId] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  const transaction = useCallback(async () => {
    const transactions = await getTransactions();
    if (transactions === undefined) return;
    else if (transactions === null) router.replace('/');
    else setTransactions(transactions);
  }, [router]);

  useEffect(() => {
    transaction();
  }, [transaction]);

  const onOpenDialog = (id: string) => {
    setId(id);
    setDialogOpen(true);
  };

  const onMoveToEdit = (id: string) => {
    router.replace(`/transactions/modify/${id}`);
  };

  const onDelete = async(id?: string) => {
    if (!id) return;
    const deleted = await deleteTransaction(id);
    if (deleted) {
      setSnackbarOpen(true);
      setTransactions(prev => prev.filter(t => t.id !== id));
      setDialogOpen(false);
    }
  };

  return (
    <div className='pb-10'>
      <TitleLine title='Transactions' month={month} />
      <div className='flex border-b-2 border-black-500 w-full h-10 leading-10 pl-3'>
        <p className='w-40'>Category</p>
        <p className='w-40'>Amount</p>
        <p className='w-40'>Date</p>
      </div>
      {transactions.map(transaction => (
        <div key={transaction.id} className='flex justify-between h-15 border-b border-black-500'>
          <Link href={`/transactions/${transaction.id}`} className='flex h-5 leading-5 pl-3 my-5 transition-all duration-300 hover:opacity-60'>
            <p className='w-40'>{transaction.categoryName}</p>
            <p className='w-40'>${transaction.amount}</p>
            <p className='w-40'>{transaction.transactionDate}</p>
          </Link>
          <div className='flex gap-2 px-3'>
            <Button variant='contained' onClick={() => onMoveToEdit(transaction.id)} sx={{ width: 80, height: 40, my: '10px' }}>Edit</Button>
            <Button variant='contained' color='error' onClick={() => onOpenDialog(transaction.id)} sx={{ width: 80, height: 40, my: '10px' }}>Delete</Button>
          </div>
        </div>
      ))}
      <LinkElement page='transactions/add' display='Add Transaction' />
      <Toast id={id} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} onDelete={onDelete} />
    </div>
  );
}
