import React from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import GuestLayout from '@/Layouts/GuestLayout';
import RoomCard from '@/Components/RoomCard';
import MonthYearPicker from '@/Components/DatePicker';
import Paginate from '@/Components/Paginate';

const Welcome = () => {
  const page = useTypedPage();
  const { user } = page.props.auth;
  const { rooms } = page.props;
  const { data } = rooms;
  const { items, meta, links } = data;
  console.log(meta);

  return (
    <GuestLayout
      title={'Rooms'}
      renderHeader={() => (
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Unlinkers</h2>
          <p>Experts in student accommodation</p>
        </div>
      )}
    >
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
    </GuestLayout>
  );
};

export default Welcome;
