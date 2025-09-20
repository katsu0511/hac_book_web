'use client';

export async function getMyCategories(): Promise<MyCategories | null | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/display/category`, {
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
