'use client';

import { Categories, CategoryForEdit } from '@/types/category';
import Summary from '@/types/summary';

export async function getAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/check-auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return false;

    const authenticated: boolean = await res.json();
    return authenticated;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
}

export async function getCategory(id: string): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'failed to get category' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return { ok: false, error: message };
  }
}

export async function getCategoryForEdit(id: string): Promise<CategoryForEdit | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${id}/edit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const categoryForEdit: CategoryForEdit = await res.json();
    return categoryForEdit;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'unknown error');
    return;
  }
}

export async function getCategories(): Promise<Categories | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const categories: Categories = await res.json();
    return categories;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'unknown error');
    return;
  }
}

export async function getParentCategories(): Promise<Categories | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/parent-categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const parentCategories: Categories = await res.json();
    return parentCategories;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'unknown error');
    return;
  }
}

export async function getTransaction(id: string): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'failed to get transaction' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return { ok: false, error: message };
  }
}

export async function getTransactionForEdit(id: string): Promise<TransactionForEdit | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions/${id}/edit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const transactionForEdit: TransactionForEdit = await res.json();
    return transactionForEdit;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'unknown error');
    return;
  }
}

export async function getTransactions(): Promise<Transaction[] | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const transactions: Transaction[] = await res.json();
    return transactions;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'unknown error');
    return;
  }
}

export async function getSummary(start?: string, end?: string): Promise<Summary | null> {
  try {
    const params = new URLSearchParams();
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    const queryString = params.toString();
    const parameter = queryString ? `?${queryString}` : '';
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dashboard/summary${parameter}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const summary: Summary = await res.json();
    return summary;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'unknown error');
    return null;
  }
}
