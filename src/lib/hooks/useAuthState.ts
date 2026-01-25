'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';

const useAuthState = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState('');
  const { authenticated, loading, refreshAuth } = useAuth();
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
    buttonLoading,
    setButtonLoading,
    error,
    setError,
    authenticated,
    loading,
    refreshAuth,
    router
  };
};

export default useAuthState;
