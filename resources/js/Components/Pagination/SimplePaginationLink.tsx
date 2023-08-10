import React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  disabled: boolean;
  onClick: () => void;
};

const SimplePaginationLink = ({ label, disabled, onClick }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition ease-in-out duration-150',
      disabled
        ? 'bg-white text-gray-700 hover:bg-gray-700 hover:text-gray-100'
        : 'bg-gray-200 text-gray-500 cursor-not-allowed',
    )}
  >
    {label}
  </button>
);

export { SimplePaginationLink };
