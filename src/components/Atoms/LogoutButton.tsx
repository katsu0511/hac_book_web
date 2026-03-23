'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { handleLogout as defaultHandleLogout } from '@/lib/api/auth';

export default function LogoutButton({
  className = '',
  onLogout = defaultHandleLogout
}: {
  className?: string;
  onLogout?: typeof defaultHandleLogout
}) {
  const { refreshAuth, router } = useAuthState();

  const logout = async () => {
    await onLogout(refreshAuth, router);
  }

  return (
    <button
      className={`hidden bg-[color:var(--color-primary)] text-white h-10 w-20 border-b border-[color:var(--color-primary)] duration-300 cursor-pointer hover:bg-white hover:text-[color:var(--color-primary)] md:block ${className}`}
      onClick={logout}
    >
      Logout
    </button>
  );
}
