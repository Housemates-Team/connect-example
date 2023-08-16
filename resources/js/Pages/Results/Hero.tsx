import React from 'react';
import { cn } from '@/lib/utils';

type HeroProps = {
  locationSlug: string;
  locationName: string;
};

export const Hero = ({ locationSlug, locationName }: HeroProps) => (
  <div className="container flex py-12 gap-8 justify-evenly items-center">
    <div>
      <h1 className="text-4xl font-bold max-w-[500px]">
        <span className={cn(locationName.length < 24 ? 'text-3xl' : 'text-2xl')}>Study in</span>
        <br />
        <span className={cn({ 'leading-[1.1] text-6xl': locationName.length < 24 })}>
          {locationName}
        </span>
      </h1>
    </div>
    <div className="w-[530px] h-[216px] relative bg-gray-100">
      <img
        alt="city"
        className="object-cover w-full h-full rounded-lg"
        src={`/images/locations/thumbnails/${locationSlug}.webp`}
      />
    </div>
  </div>
);
