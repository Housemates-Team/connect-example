import React from 'react';
import { Links, Meta } from '@/types';
import SimplePaginationLink from '@/Components/Pagination/SimplePaginationLink';
import PaginationLink from '@/Components/Pagination/PaginationLink';
import PageInactive from '@/Components/Pagination/PageInactive';

interface Props {
    meta: Meta;
    links: Links;
}

const Paginate = ({ meta, links }: Props) => {
    if (meta.links.length === 3) return null;
    return (
        <div className="mt-5 flex items-center justify-between border-gray-200 py-3">
            {/* Show simple pagination on mobile screens */}
            <div className="flex flex-1 justify-between sm:hidden">
                <SimplePaginationLink label={'Previous'} url={links.prev} />
                <SimplePaginationLink label={'Next'} url={links.next} />
            </div>
            {/* Show regular pagination on larger screens */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-bold">{meta.from}</span> to{' '}
                        <span className="font-bold">{meta.to}</span> of{' '}
                        <span className="font-bold">{meta.total}</span> results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        {meta.links.map(({ active, label, url }) => {
                            return url === null ? (
                                <PageInactive key={label} label={label} />
                            ) : (
                                <PaginationLink
                                    key={label}
                                    active={active}
                                    label={label}
                                    url={url}
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Paginate;
