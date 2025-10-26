'use client';

export async function login(email: string, password: string) {
  try {
    return await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
  } catch (error) {
    return error instanceof Error ? error.message : 'unknown error';
  }
}

export async function addCategory(data: CategoryFormData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parentId: data.parentId, name: data.name, type: data.type, description: data.description }),
      credentials: 'include'
    });

    if (!res.ok) return 'failed to add category';

    const json = await res.json();
    return json.category;
  } catch (error) {
    return error instanceof Error ? error.message : 'unknown error';
  }
}

export async function modifyCategory(data: CategoryFormData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.id, parentId: data.parentId, name: data.name, type: data.type, description: data.description }),
      credentials: 'include'
    });

    if (!res.ok) return 'failed to modify category';

    const json = await res.json();
    return json.category;
  } catch (error) {
    return error instanceof Error ? error.message : 'unknown error';
  }
}

export async function addTransaction(data: TransactionFormData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryId: data.categoryId, amount: data.amount, currency: data.currency, description: data.description, transactionDate: data.transactionDate }),
      credentials: 'include'
    });

    if (!res.ok) return 'failed to add transaction';

    const transaction = await res.json();
    return transaction;
  } catch (error) {
    return error instanceof Error ? error.message : 'unknown error';
  }
}

export async function modifyTransaction(data: TransactionFormData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.id, categoryId: data.categoryId, amount: data.amount, currency: data.currency, description: data.description, transactionDate: data.transactionDate }),
      credentials: 'include'
    });

    if (!res.ok) return 'failed to modify transaction';

    const transaction = await res.json();
    return transaction;
  } catch (error) {
    return error instanceof Error ? error.message : 'unknown error';
  }
}

export async function deleteTransaction(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
      credentials: 'include'
    });

    if (!res.ok) return 'failed to delete transaction';

    const deleted = await res.json();
    return deleted;
  } catch (error) {
    return error instanceof Error ? error.message : 'unknown error';
  }
}
