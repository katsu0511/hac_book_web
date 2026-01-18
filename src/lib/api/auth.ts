'use client';

import { getAuth } from '@/lib/api/getters';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { login, logout, signup } from '@/lib/api/actions';

export const handleGetAuth = async (): Promise<boolean> => {
  const res = await getAuth();

  if (!res.ok) {
    console.log(res.error);
    return false;
  }

  const authenticated: boolean = await res.response.json();
  return authenticated;
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

export const handleLogout = async (
  refreshAuth: () => Promise<void>,
  router: AppRouterInstance
) => {
  const res = await logout();

  if (!res.ok) {
    alert(res.error);
    return;
  };

  await refreshAuth();
  router.replace('/login');
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

  if (password !== passwordConfirm) {
    setError('password doesn\'t match');
    return;
  }

  const res = await signup(name, email, password);

  if (!res.ok) {
    setError(res.error);
    return;
  }

  await refreshAuth();
  router.replace('/');
}
