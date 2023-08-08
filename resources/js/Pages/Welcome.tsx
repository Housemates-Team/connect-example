import React from 'react';
import { Head } from '@inertiajs/react';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';
import { Banner } from '@/Components/Banner';

const Welcome = () => (
  <>
    <Head title="Rooms" />
    <Banner />
    <HeaderNavigation />
    <main>
      <p>Test</p>
    </main>
  </>
);

export default Welcome;
