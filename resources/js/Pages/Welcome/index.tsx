import React from 'react';
import { Head } from '@inertiajs/react';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';
import { Banner } from '@/Components/Banner';
import { Footer } from '@/Layouts/Footer';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { Hero } from './Hero';
import { CityGrid } from './CityGrid';

const Welcome = () => {
  const page = useTypedPage();

  console.info(page.props);

  return (
    <>
      <Head title="Rooms" />
      <Banner />
      <HeaderNavigation />
      <main>
        <Hero locations={[]} />
        <CityGrid />
      </main>
      <Footer />
    </>
  );
};

export default Welcome;
