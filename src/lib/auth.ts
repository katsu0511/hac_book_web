export const getAuth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/check-auth`, {
      method: 'GET',
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
