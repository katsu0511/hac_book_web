'use client';

import { CategoryFormData } from "@/types/category";

export async function login(email: string, password: string): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    if (!res.ok) {
      const json = await res.json();
      return { ok: res.ok, error: json.loginFailed };
    }

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { ok: false, error: message };
  }
}

export async function logout(): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'Logout failed' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { ok: false, error: message };
  }
}

export async function signup(name: string, email: string, password: string): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include'
    });

    if (!res.ok) {
      const json = await res.json();
      let message = '';
      if (json.email) message += json.email;
      if (json.password) message += json.password;
      if (json.signupFailed) message += json.signupFailed;
      return { ok: res.ok, error: message };
    }

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { ok: false, error: message };
  }
}

export async function addCategory(data: CategoryFormData): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parentId: data.parentId, name: data.name, type: data.type, description: data.description }),
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'failed to add category' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return { ok: false, error: message };
  }
}

export async function modifyCategory(data: CategoryFormData): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.id, parentId: data.parentId, name: data.name, type: data.type, description: data.description }),
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'failed to modify category' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return { ok: false, error: message };
  }
}

export async function addTransaction(data: TransactionFormData): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryId: data.categoryId, amount: data.amount, currency: data.currency, description: data.description, transactionDate: data.transactionDate }),
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'failed to add transaction' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return { ok: false, error: message };
  }
}

export async function modifyTransaction(data: TransactionFormData): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.id, categoryId: data.categoryId, amount: data.amount, currency: data.currency, description: data.description, transactionDate: data.transactionDate }),
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'failed to modify transaction' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return { ok: false, error: message };
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
