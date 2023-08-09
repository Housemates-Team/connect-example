import React from 'react';
import classNames from 'classnames';
import { Link } from '@inertiajs/react';
import { Nullable } from '@/types';

type Props = {
  label: string;
  url: Nullable<string>;
}

const SimplePaginationLink = ({ label, url }: Props) => {
  const active = url !== null;
  const className = classNames(
    active
      ? 'bg-white text-gray-700 hover:bg-gray-700 hover:text-gray-100 transition ease-in-out duration-150'
      : 'bg-gray-200 text-gray-500 cursor-not-allowed',
    'relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium',
  );
  return (
    <>
      {active ? (
        <Link href={url} className={className}>
          {label}
        </Link>
      ) : (
        <button className={className}>{label}</button>
      )}
    </>
  );
};

export { SimplePaginationLink };
