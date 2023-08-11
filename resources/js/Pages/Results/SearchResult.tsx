import React from 'react';
import { RoomCard } from '@/Components/RoomCard';
import { Meta, Room } from '@/types';
import { Paginate } from '@/Components/Paginate';
import { updateQueryParam } from '@/lib/navigation';

type SearchResultProps = {
  rooms: Room[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: Meta;
};

export const SearchResult = ({ rooms, meta }: SearchResultProps) => (
  <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
    <div className="flex flex-col gap-4">
      {rooms.map((room) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </div>

    <Paginate
      meta={meta}
      onPageChange={(newPage: number) => {
        const newUrl = updateQueryParam(window.location, { page: String(newPage) });
        window.location.href = newUrl;
      }}
    />
  </div>
);
