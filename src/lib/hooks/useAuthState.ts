'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

const useAuthState = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState('');
  const { authenticated, refreshAuth } = useAuth();
  const router = useRouter();

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    loadingState,
    setLoadingState,
    error,
    setError,
    authenticated,
    refreshAuth,
    router
  };
};

export default useAuthState;
