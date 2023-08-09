import React from 'react';
import { Amenity as AmenityType } from '@/types';

type Props = {
  amenity: AmenityType;
}
const Amenity = ({ amenity }: Props) => {
  return <p className="bg-white rounded p-2 text-sm font-bold">{amenity.name}</p>;
};

export { Amenity };
