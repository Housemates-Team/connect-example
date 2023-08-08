import React from 'react';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { PageLink as PageLinkProps } from '@/types';

const PageInactive = ({ label }: Pick<PageLinkProps, 'label'>) => {
  const className = classNames(
    label === '&laquo; Previous' ? 'rounded-l-md' : 'rounded-r-md',
    'relative inline-flex items-center px-4 py-2 text-gray-500 bg-gray-200 cursor-not-allowed',
  );
  const linkIcon =
    label === '&laquo; Previous' ? (
      <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    ) : (
      <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    );

  return <button className={className}>{linkIcon}</button>;
};

export { PageInactive };
