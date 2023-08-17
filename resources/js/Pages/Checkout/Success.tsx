import React from 'react';
import { Head } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import route from 'ziggy-js';
import { Banner } from '@/Components/Banner';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { Button } from '@/Common/button';
import { CheckoutHeader } from './CheckoutHeader';

const Success = () => {
  const page = useTypedPage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { room, booking_period } = page.props as any;

  return (
    <>
      <Head title="Payment successful" />
      <Banner />
      <HeaderNavigation />
      <CheckoutHeader
        roomId={room.id}
        roomName={room.name}
        propertyName={room.property.name}
        bookingPeriod={booking_period}
      />
      <div className="container py-12 px-32">
        <h1 className="text-3xl font-bold">We confirmed your booking!</h1>
        <p className="text-gray-700 text-lg mt-2">
          We’ll pass your details and deposit on to the accommodation provider and they’ll begin
          processing your booking.
        </p>

        <p className="mt-4 text-gray-700">
          The accommodation provider will also now send you a tenancy agreement which{' '}
          <b>you must sign as soon as possible</b>, this will fully confirm your booking and is the
          final step to securing your place. If they require any additional information Housemates
          or the operator may be in touch.
        </p>
        <a href={route('listing', { room_id: room.id })}>
          <Button size="lg" className="whitespace-nowrap mt-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            <span>Go back to the room</span>
          </Button>
        </a>
      </div>
    </>
  );
};

export default Success;
