import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Meta } from '@/types';
import { SimplePaginationLink } from '@/Components/Pagination/SimplePaginationLink';
import { PaginationLink } from '@/Components/Pagination/PaginationLink';

type Props = {
  meta: Meta;
  onPageChange: (newPage: number) => void;
};

export const Paginate = ({ meta, onPageChange }: Props) => (
  <div className="mt-5 flex items-center justify-between border-gray-200 py-3">
    {/* Show simple pagination on mobile screens */}
    <div className="flex flex-1 justify-between sm:hidden">
      <SimplePaginationLink
        onClick={() => onPageChange(meta.current_page - 1)}
        label="Previous"
        disabled={meta.current_page === 1}
      />
      <SimplePaginationLink
        onClick={() => onPageChange(meta.current_page + 1)}
        label="Next"
        disabled={meta.current_page === meta.total_pages}
      />
    </div>
    {/* Show regular pagination on larger screens */}
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-bold">{(meta.current_page - 1) * meta.per_page}</span> to{' '}
          <span className="font-bold">{(meta.current_page - 1) * meta.per_page + meta.count}</span>{' '}
          of <span className="font-bold">{meta.total}</span> results
        </p>
      </div>
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <PaginationLink
            className="rounded-l-md"
            onClick={() => onPageChange(meta.current_page - 1)}
            status={meta.current_page === 1 ? 'disabled' : 'active'}
          >
            <ChevronLeftIcon height="20" width="20" />
          </PaginationLink>
          {Array.from({ length: meta.total_pages }, (_, idx) => (
            <PaginationLink
              key={idx}
              onClick={() => onPageChange(idx + 1)}
              status={meta.current_page === idx + 1 ? 'current' : 'active'}
            >
              {idx + 1}
            </PaginationLink>
          ))}
          <PaginationLink
            className="rounded-r-md"
            onClick={() => onPageChange(meta.current_page + 1)}
            status={meta.current_page === meta.total_pages ? 'disabled' : 'active'}
          >
            <ChevronRightIcon height="20" width="20" />
          </PaginationLink>
        </nav>
      </div>
    </div>
  </div>
);
