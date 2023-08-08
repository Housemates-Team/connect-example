import React from 'react';
import { Link } from '@inertiajs/react';
import route from 'ziggy-js';
import { Room } from '@/types';
import { PrimaryButton } from '@/Components/PrimaryButton';

type Props = {
  room: Room;
};
const RoomCard = ({ room }: Props) => {
  const firstImage = room.images[0];

  const displayDescription = () => {
    return room.description.substring(0, 120) + '...';
  };

  return (
    <div className="flex min-h-[266px] space-x-3 rounded-lg border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 overflow-hidden">
      <div className="w-2/5 min-h-full">
        <img
          className="block h-full object-cover w-full"
          src={firstImage.small_plus}
          alt={room.name}
        />
      </div>
      <div className="min-w-0 w-3/5 p-6">
        <Link href={route('rooms.show', { roomId: room.id })} className="focus:outline-none">
          <p className="text-2xl font-semibold tracking-wide text-gray-900">{room.name}</p>
          <p className="truncate text-base text-gray-500 pt-1">
            {room.address.city}, {room.address.country}
          </p>
          <div className="flex flex-col justify-between">
            <p className="text-base text-gray-500 pt-5">{displayDescription()}</p>
            <div className="py-5">
              {room.universities.map((university) => (
                <p
                  className="text-sm flex justify-between space-y-2 items-center"
                  key={university.name}
                >
                  <span>{university.name}</span>
                  <span className="font-bold">{university.drive}</span>
                </p>
              ))}
            </div>
            <div className="pt-10 flex items-center justify-between">
              <p>
                <span className="text-sm text-gray-400">From:</span>
                <span className="text-xl font-bold px-1">{room.price_range.min}</span>
                <span>/week</span>
              </p>
              <PrimaryButton className="px-5 py-4">View this room</PrimaryButton>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export { RoomCard };
