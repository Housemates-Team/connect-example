import React from 'react';

export const CityGrid = () => (
  <div className="bg-gray-100">
    <div className="container py-16">
      <h2 className="font-bold text-3xl">Where will you study</h2>
      <div className="mt-16 grid grid-cols-4 gap-4">
        {Array.from(
          [
            'London',
            'Manchester',
            'Melbourne',
            'Birmingham',
            'Edinburgh',
            'Liverpool',
            'Dublin',
            'Sydney',
          ].map((cityName) => (
            <a
              key={cityName}
              href={`/city/${cityName.toLowerCase()}`}
              className="relative h-[140px] text-white "
            >
              <div
                style={{
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.0))',
                }}
                className="w-full rounded-md h-[40%] bottom-0 absolute"
              />
              <img
                className="object-cover rounded-md w-full h-full"
                alt={cityName}
                src={`/images/locations/small/${cityName.toLowerCase()}.webp`}
              />
              <p className="absolute left-4 bottom-2 shadow font-semibold">{cityName}</p>
            </a>
          )),
        )}
      </div>
    </div>
  </div>
);
