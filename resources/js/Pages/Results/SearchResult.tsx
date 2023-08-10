import React from 'react';
import { RoomCard } from '@/Components/RoomCard';
import { Meta, Room } from '@/types';
import { Paginate } from '@/Components/Paginate';

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
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', String(newPage));

        // Construct the new URL with the updated page parameter
        const newUrl = [
          window.location.origin,
          window.location.pathname,
          `?${queryParams.toString()}`,
        ].join('');

        window.location.href = newUrl;
      }}
    />
  </div>
);
