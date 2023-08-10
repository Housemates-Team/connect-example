import React from 'react';
import { Head } from '@inertiajs/react';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { Banner } from '@/Components/Banner';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';
import { SearchLocation } from '@/Components/CitySearchDropdown';
import { Footer } from '@/Layouts/Footer';
import { Hero } from './Hero';
import { Filters } from './Filters';
import { SearchResult } from './SearchResult';

const Results = () => {
  const page = useTypedPage();
  const { rooms } = page.props;
  const location = page.props.location as SearchLocation;

  return (
    <>
      <Head title="Rooms" />
      <Banner />
      <HeaderNavigation />
      <main>
        <Hero locationName={location.name} />
        <div className="bg-gray-50 border-t py-16">
          <div className="container flex">
            <Filters />
            {
              // TODO: remove no_rooms props
              !page.props.no_rooms && (
                <SearchResult rooms={rooms.data.items} meta={rooms.data.meta} />
              )
            }
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Results;
