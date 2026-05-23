'use client';

import { DisclosureButton } from '@headlessui/react';
import Link from 'next/link';

export default function DrawerButton({link, display}: {link: string, display: string}) {
  return <DisclosureButton as={Link} href={`/${link}`} className='bg-white text-[color:var(--color-primary)] font-bold text-center rounded-sm cursor-pointer duration-300 hover:bg-[color:var(--color-primary)] hover:text-white'>{display}</DisclosureButton>;
}
