'use client';

import { handleLogout } from "@/lib/api/auth";
import useAuthState from "@/lib/hooks/useAuthState";

export default function LogoutButton() {
  const { refreshAuth, router } = useAuthState();

  const logout = async () => {
    await handleLogout(refreshAuth, router);
  }

  return <button className='hidden bg-[color:var(--color-primary)] text-white h-10 w-20 border-b border-[color:var(--color-primary)] duration-300 cursor-pointer hover:bg-white hover:text-[color:var(--color-primary)] md:block' onClick={logout}>Logout</button>;
}
