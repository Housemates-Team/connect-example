import React from 'react';

type HeroProps = {
  locationName: string;
};

export const Hero = ({ locationName }: HeroProps) => (
  <div className="container flex py-12 gap-8 justify-evenly items-center">
    <div>
      <h1 className="text-6xl leading-[1.1] font-bold max-w-[500px]">
        <span className="text-3xl">Study in</span>
        <br />
        {locationName}
      </h1>
    </div>
    <div className="w-[530px] h-[206px] bg-gray-100" />
  </div>
);
