'use client';

export async function addCategory(data: CategoryFormData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/add/category`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/modify/category`, {
      method: 'POST',
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
