'use client';

import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export const ProfileSidebarLink = ({
  url,
  label,
}: {
  url: string;
  label: string;
}) => {
  const pathname = usePathname();

  const isActive = pathname === url;
  return (
    <li className='mt-2 uppercase'>
      <Link
        href={url}
        className={twMerge(
          'text-primary pb-1',
          isActive && 'border-b border-primary'
        )}
      >
        {label}
      </Link>
    </li>
  );
};
