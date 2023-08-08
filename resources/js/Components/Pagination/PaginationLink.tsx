import React from 'react';
import classNames from 'classnames';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { PageLink } from '@/types';

const PaginationLink = ({ active, label, url }: PageLink) => {
  const className = classNames(
    'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
    {
      'z-10 bg-white text-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
        active,
      'text-gray ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0': !active,
      'rounded-l-md': label === '&laquo; Previous',
      'rounded-r-md': label === 'Next &raquo;',
    },
  );
  const generateLabel = () => {
    if (label === '&laquo; Previous') {
      return <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />;
    } else if (label === 'Next &raquo;') {
      return <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />;
    }
    return <span dangerouslySetInnerHTML={{ __html: label }}></span>;
  };
  return (
    <Link className={className} href={url as string}>
      {generateLabel()}
    </Link>
  );
};

export { PaginationLink };
