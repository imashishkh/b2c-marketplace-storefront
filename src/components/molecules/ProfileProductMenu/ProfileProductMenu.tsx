'use client';

import { Button } from '@/components/atoms';
import { Link } from '@/i18n/routing';
import { KebabMenuIcon } from '@/icons';
import { useEffect, useRef, useState } from 'react';

export const ProfileProductMenu = ({
  items,
}: {
  items: {
    label: string;
    icon: React.ReactNode;
    action: string;
  }[];
}) => {
  const [open, setOpen] = useState(false);

  const selectRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (
        selectRef.current &&
        selectRef.current?.children[0] !== e.target &&
        selectRef.current?.children[0].children[0] !==
          e.target
      )
        setOpen(false);
    });

    return window.removeEventListener('click', () => null);
  }, []);

  console.log(open);
  return (
    <div className='absolute top-3 right-3' ref={selectRef}>
      <Button
        variant='tonal'
        className='w-10 h-10 flex justify-center p-0 items-center'
        onClick={() => setOpen(!open)}
      >
        <KebabMenuIcon size={18} />
      </Button>

      {open && (
        <ul className='absolute border border-primary p-4 rounded-sm bg-primary right-0 mt-1 min-w-[200px] flex flex-col gap-3'>
          {items.map((item) => (
            <li
              key={item.label}
              onClick={() => setOpen(false)}
            >
              <Link
                href={item.action}
                className='flex gap-2 items-center'
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
