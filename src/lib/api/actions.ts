'use client';

import { CategoryFormData } from "@/types/category";
import { TransactionFormData } from "@/types/transaction";

export async function login(email: string, password: string): Promise<Result> {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    if (!res.ok) {
      const data = await res.json();
      return { ok: res.ok, error: data.message };
    }

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred.';
    return { ok: false, error: message };
  }
}

export async function logout(): Promise<Result> {
  try {
    const res = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'Failed to logout.' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred.';
    return { ok: false, error: message };
  }
}

export async function signup(name: string, email: string, password: string): Promise<Result> {
  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include'
    });

    if (!res.ok) {
      const data = await res.json();
      let message = '';
      if (data.email) message += data.email + '\n';
      if (data.password) message += data.password + '\n';
      if (!data.email && !data.password) message = data.message;
      return { ok: res.ok, error: message };
    }

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred.';
    return { ok: false, error: message };
  }
}

export async function addCategory(data: CategoryFormData): Promise<Result> {
  try {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parentId: data.parentId, name: data.name, type: data.type, description: data.description }),
      credentials: 'include'
    });

    if (!res.ok) {
      const data = await res.json();
      return { ok: res.ok, error: data.message };
    }

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred.';
    return { ok: false, error: message };
  }
}

export async function modifyCategory(data: CategoryFormData): Promise<Result> {
  try {
    const res = await fetch(`/api/categories/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.id, parentId: data.parentId, name: data.name, type: data.type, description: data.description }),
      credentials: 'include'
    });

    if (!res.ok) {
      const data = await res.json();
      return { ok: res.ok, error: data.message };
    }

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred.';
    return { ok: false, error: message };
  }
}

export async function addTransaction(data: TransactionFormData): Promise<Result> {
  try {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryId: data.categoryId, amount: data.amount, currency: data.currency, description: data.description, transactionDate: data.transactionDate }),
      credentials: 'include'
    });

    if (!res.ok) {
      const data = await res.json();
      return { ok: res.ok, error: data.message };
    }

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred.';
    return { ok: false, error: message };
  }
}

export async function modifyTransaction(data: TransactionFormData): Promise<Result> {
  try {
    const res = await fetch(`/api/transactions/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.id, categoryId: data.categoryId, amount: data.amount, currency: data.currency, description: data.description, transactionDate: data.transactionDate }),
      credentials: 'include'
    });

    if (!res.ok) {
      const data = await res.json();
      return { ok: res.ok, error: data.message };
    }

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred.';
    return { ok: false, error: message };
  }
}

export async function deleteTransaction(id: string): Promise<Result> {
  try {
    const res = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'Failed to delete transaction.' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred.';
    return { ok: false, error: message };
  }
}
