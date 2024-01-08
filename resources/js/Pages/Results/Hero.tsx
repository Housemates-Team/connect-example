import React from 'react';
import { cn } from '@/lib/utils';

type HeroProps = {
  citySlug: string;
  locationName: string;
  handleGeneralEnquiryClick: () => void;
};

export const Hero = ({ citySlug, locationName, handleGeneralEnquiryClick }: HeroProps) => (
  <div className="container flex py-12 gap-8 justify-evenly items-center">
    <div>
      <h1 className="text-4xl font-bold max-w-[500px]">
        <span className={cn(locationName.length < 24 ? 'text-3xl' : 'text-2xl')}>Study in</span>
        <br />
        <span className={cn({ 'leading-[1.1] text-6xl': locationName.length < 24 })}>
          {locationName}
        </span>
      </h1>
        <div className="mt-5">
            <button
                onClick={handleGeneralEnquiryClick}
                className="bg-black text-white px-6 py-3 rounded-md font-semibold text-lg">
                Enquire now
            </button>
        </div>
    </div>
    <div className="w-[530px] h-[216px] relative bg-gray-100">
      <img
        alt="city"
        className="object-cover w-full h-full rounded-lg"
        src={`/images/locations/thumbnails/${citySlug}.webp`}
      />
    </div>
  </div>
);
