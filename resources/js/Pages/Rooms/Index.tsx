import React from 'react';
import { Head } from '@inertiajs/react';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { RoomCard } from '@/Components/RoomCard';
import { MonthYearPicker } from '@/Components/DatePicker';
import { Paginate } from '@/Components/Paginate';
import { Banner } from '@/Components/Banner';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';

const Rooms = () => {
  const page = useTypedPage();
  const { rooms } = page.props;
  const { data } = rooms;
  const { items, meta, links } = data;
  console.log(meta);

  return (
    <>
      <Head title="Rooms" />
      <Banner />
      <HeaderNavigation />
      <div className="max-w-4xl mx-auto py-10 sm:px-6 lg:px-8">
        <div>
          <MonthYearPicker />
        </div>
        <div className="space-y-5 mt-10">
          {items.map((room) => (
            <RoomCard room={room} key={room.id} />
          ))}
        </div>

        <Paginate meta={meta} links={links} />
      </div>
    </>
  );
};

export default Rooms;
