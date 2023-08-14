import React from 'react';
import { Head } from '@inertiajs/react';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';
import { Banner } from '@/Components/Banner';
import { Footer } from '@/Layouts/Footer';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { SearchLocation } from '@/Components/CitySearchDropdown';
import { Hero } from './Hero';
import { CityGrid } from './CityGrid';

const Welcome = () => {
  const page = useTypedPage();

  return (
    <>
      <Head title="Rooms" />
      <Banner />
      <HeaderNavigation />
      <main>
        <Hero locations={page.props.locations as SearchLocation[]} />
        <CityGrid />
      </main>
      <Footer />
    </>
  );
};

export default Welcome;
