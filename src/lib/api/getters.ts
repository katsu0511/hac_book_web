'use client';

export async function getAuth(): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/check-auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!res.ok) return { ok: res.ok, error: 'Failed to check authentication.' };

    return { ok: res.ok, response: res };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred.';
    return { ok: false, error: message };
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

export async function getCategoryForEdit(id: string): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${id}/edit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export async function getCategories(): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export async function getParentCategories(): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/parent-categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export async function getTransaction(id: string): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export async function getTransactionForEdit(id: string): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions/${id}/edit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export async function getTransactions(): Promise<Result> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export async function getSummary(start?: string, end?: string): Promise<Result> {
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
