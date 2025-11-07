'use client';

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

    const json = await res.json();
    return json.authenticated;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
}

export async function getCategory(id: string): Promise<Category | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const category: Category = await res.json();
    return category;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'unknown error');
    return;
  }
}

export async function getMyCategories(): Promise<MyCategories | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const categories: MyCategories = await res.json();
    return categories;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'unknown error');
    return;
  }
}

export async function getParentCategories(): Promise<Category[] | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/parent-categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const parentCategories: Category[] = await res.json();
    return parentCategories;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'unknown error');
    return;
  }
}

export async function getTransaction(id: string): Promise<Transaction | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return null;

    const transaction: Transaction = await res.json();
    return transaction;
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
