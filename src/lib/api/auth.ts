import { getAuth } from '@/lib/api/getters';
import { login, signup } from '@/lib/api/actions';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleGetAuth = async (): Promise<boolean> => {
  return await getAuth();
}

export const handleLogin = async (
  email: string,
  password: string,
  setError: (error: string) => void,
  refreshAuth: () => Promise<void>,
  router: AppRouterInstance,
) => {
  setError('');
  const res = await login(email, password);

  if (!res.ok) {
    setError(res.error);
    return;
  }

  await refreshAuth();
  router.replace('/');
}

export const handleSignup = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  setError: (error: string) => void,
  refreshAuth: () => Promise<void>,
  router: AppRouterInstance
) => {
  setError('');
  if (!name || !email || !password || !passwordConfirm) {
    setError('input your name, email and password');
    return;
  } else if (password !== passwordConfirm) {
    setError('password doesn\'t match');
    return;
  }

  const res = await signup(name, email, password);
  if (typeof res === 'string') {
    setError(res);
    return;
  }
  if (!res.ok) {
    const json = await res.json();
    let errors = '';
    if (json.email) errors += json.email;
    if (json.password) errors += `\n${json.password}`;
    if (json.signupFailed) errors += `\n${json.signupFailed}`;
    setError(errors);
    return;
  };
  handleLogin(email, password, setError, refreshAuth, router);
}
