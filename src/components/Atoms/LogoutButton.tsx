'use client';

import useAuthState from '@/lib/hooks/useAuthState';
import { handleLogout as defaultHandleLogout } from '@/lib/api/auth';

export default function LogoutButton({ onLogout = defaultHandleLogout, setOpenMenu }: { onLogout?: typeof defaultHandleLogout, setOpenMenu: (openMenu: boolean) => void }) {
  const { refreshAuth, router } = useAuthState();

  const logout = async () => {
    setOpenMenu(false);
    await onLogout(refreshAuth, router);
  }

  return <button className={`block bg-[color:var(--color-primary)] text-white w-44 rounded-sm mx-3 my-2 duration-300 cursor-pointer hover:opacity-60`} onClick={logout}>Logout</button>;
}
