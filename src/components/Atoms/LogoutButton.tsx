'use client';

export default function LogoutButton(props: { logout: () => Promise<void> }) {
  return <button className='block bg-blue-500 text-white h-10 w-20 duration-300 hover:bg-white hover:text-blue-500 cursor-pointer' onClick={props.logout}>Logout</button>;
}
