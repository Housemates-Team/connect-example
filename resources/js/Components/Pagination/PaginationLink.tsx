import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type PaginationLinkProps = {
  children: ReactNode;
  status?: 'active' | 'current' | 'disabled';
  onClick: () => void;
  className?: string;
};

const PaginationLink = ({
  className,
  status = 'active',
  children,
  onClick,
}: PaginationLinkProps) => (
  <button
    className={cn(
      'h-8 relative inline-flex items-center px-4 py-2 text-sm font-semibold bg-white text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2',
      status === 'active' &&
        'focus-visible:outline text-gray ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
      status === 'current' && 'bg-gray-900 text-white',
      status === 'disabled' && 'bg-gray-200 text-gray-500 cursor-not-allowed',
      className,
    )}
    onClick={onClick}
    disabled={status === 'disabled'}
  >
    {children}
  </button>
);

export { PaginationLink };
