import React from 'react';
import { Link } from '@inertiajs/react';
import route from 'ziggy-js';
import { Room } from '@/types';
import { Button } from '@/components/ui/button';

type Props = {
  room: Room;
};

const RoomCard = ({ room }: Props) => {
  const firstImage = room.images[0];

  return (
    <Link
      href={route('listing', { room_id: room.id })}
      className="flex min-h-[270px] border border-gray-300 bg-white shadow-sm focus-within:ring-2 overflow-hidden"
    >
      <div className="w-2/5 min-h-full">
        <img
          className="block h-full object-cover w-full"
          src={firstImage.small_plus}
          alt={room.name}
        />
      </div>
      <div className="min-w-0 w-3/5 p-6">
        <div className="flex flex-col justify-between gap-8 h-full focus:outline-none">
          <div>
            <p className="text-2xl font-semibold tracking-wide text-gray-900">{room.name}</p>
            <p className="truncate text-base text-gray-500 pt-1">{room.property.name}</p>
            <div className="mt-10 flex flex-col gap-2">
              {room.universities.slice(0, 2).map((university) => (
                <p className="text-sm flex justify-between items-center" key={university.name}>
                  <span>{university.name}</span>
                  <span className="font-bold">{university.drive}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p>
              <span className="text-sm text-gray-400">From:</span>
              <span className="text-xl font-bold px-1">{room.price_range.min}</span>
              <span>/week</span>
            </p>
            <Button className="px-5 py-4">View this room</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { RoomCard };
