'use client';

export default function LogoutButton(props: { logout: () => Promise<void> }) {
  return <button className='bg-[color:var(--color-primary)] text-white h-10 w-20 duration-300 hover:bg-white hover:text-[color:var(--color-primary)] cursor-pointer' onClick={props.logout}>Logout</button>;
}
