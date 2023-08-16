import { CalendarIcon } from '@radix-ui/react-icons';
import React from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import route from 'ziggy-js';

type CheckoutHeaderProps = {
  roomId: string;
  roomName: string;
  propertyName: string;
  bookingPeriod: {
    start_date: string;
    end_date: string;
    price_per_week: string;
  };
};

export const CheckoutHeader = ({
  roomId,
  roomName,
  propertyName,
  bookingPeriod,
}: CheckoutHeaderProps) => (
  <div className="sticky border-b">
    <div className="container items-center flex gap-4 py-8">
      <div className="h-[48px] w-[48px]">
        <img
          className="object-cover rounded-full w-full h-full"
          alt="room"
          src="https://ik.imagekit.io/rk1sb42mtmr/tr:h-auto,w-560,f-jpg,q-70/fd658a01-33c2-4eb4-b592-6198172b311a/media/ovqR8XdOotRYHFi7NjqmTuEAPYc8zCYLUHPbxM4P.jpg"
        />
      </div>
      <div>
        <a
          href={route('listing', { room_id: roomId })}
          target="_blank"
          className="text-xl font-semibold flex items-center gap-1 hover:text-gray-800 hover:underline"
          rel="noreferrer"
        >
          {roomName} - {propertyName} <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </a>
        <p className="text-gray-700 flex gap-2 items-center">
          <CalendarIcon />
          <span>
            {bookingPeriod.start_date} - {bookingPeriod.end_date}
          </span>
        </p>
      </div>
      <div className="ml-auto bg-gray-50 p-4 border rounded-md">
        <span className="font-semibold">{bookingPeriod.price_per_week}</span> / week
      </div>
    </div>
  </div>
);
