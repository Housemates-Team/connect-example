import { Head } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';
import { Banner } from '@/Components/Banner';

interface Props {
  title: string;
  renderHeader?(): React.JSX.Element;
}

const GuestLayout = ({ title, renderHeader, children }: PropsWithChildren<Props>) => (
  <div>
    <Head title={title} />

    <Banner />

    <div className="min-h-screen bg-gray-100">
      {/* <!-- Page Heading --> */}
      {renderHeader ? (
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{renderHeader()}</div>
        </header>
      ) : null}

      {/* <!-- Page Content --> */}
      <main>{children}</main>
    </div>
  </div>
);

export { GuestLayout };
