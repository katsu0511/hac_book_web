'use client';

import { getCurrentMonth } from '@/lib/domain/month';
import { useState } from 'react';
import useAuthState from '@/lib/hooks/useAuthState';
import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import { getTransactions } from '@/lib/api/getters';
import { deleteTransaction } from '@/lib/api/actions';
import { AuthRedirectToLogin } from '@/lib/auth/AuthRedirect';
import TitleLine from '@/components/Molecules/TitleLine';
import LinkElement from '@/components/Molecules/LinkElement';
import Toast from '@/components/Molecules/Toast';

const month = getCurrentMonth();

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [id, setId] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { router } = useAuthState();

  const fetchTransactions = useCallback(async () => {
    const result = await getTransactions();
    if (!result.ok) console.log(result.error);
    else {
      const res: Transaction[] = await result.response.json();
      setTransactions(res);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const onOpenDialog = (id: string) => {
    setId(id);
    setDialogOpen(true);
  };

  const onMoveToEdit = (id: string) => {
    router.replace(`/transactions/modify/${id}`);
  };

  const onDelete = async(id?: string) => {
    if (!id) return;
    const res = await deleteTransaction(id);
    if (res.ok) {
      setSnackbarOpen(true);
      setTransactions(prev => prev.filter(t => t.id !== id));
      setDialogOpen(false);
    }
  };

  return (
    <AuthRedirectToLogin>
      <div className='pb-10'>
        <TitleLine title='Transactions' month={month} />
        <div className='flex border-b-2 border-black-500 w-full h-10 text-center leading-10 pl-0 md:text-left md:pl-3'>
          <p className='w-1/3 md:w-40'>Category</p>
          <p className='w-1/3 md:w-40'>Amount</p>
          <p className='w-1/3 md:w-40'>Date</p>
        </div>
        {transactions.map(transaction => (
          <div key={transaction.id} className='flex justify-between h-15 border-b border-black-500'>
            <Link href={`/transactions/${transaction.id}`} className='flex w-full h-5 leading-5 pl-0 my-5 transition-all duration-300 hover:opacity-60 md:pl-3'>
              <p className='w-1/3 md:w-40'><span className='pl-[calc(50%-32px)] md:pl-0'>{transaction.categoryName}</span></p>
              <p className='w-1/3 md:w-40'><span className='pl-[calc(50%-25px)] md:pl-0'>${transaction.amount}</span></p>
              <p className='w-1/3 text-center md:w-40 md:text-left'>{transaction.transactionDate}</p>
            </Link>
            <div className='hidden gap-2 px-3 md:flex'>
              <Button variant='contained' onClick={() => onMoveToEdit(transaction.id)} sx={{ width: 80, height: 40, my: '10px' }}>Edit</Button>
              <Button variant='contained' color='error' onClick={() => onOpenDialog(transaction.id)} sx={{ width: 80, height: 40, my: '10px' }}>Delete</Button>
            </div>
          </div>
        ))}
        <LinkElement page='transactions/add' display='Add Transaction' />
        <Toast id={id} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} onDelete={onDelete} />
      </div>
    </AuthRedirectToLogin>
  );
}
