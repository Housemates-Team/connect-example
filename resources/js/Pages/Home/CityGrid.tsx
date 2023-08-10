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
              className="relative h-[140px] bg-gray-700 text-white "
            >
              <p className="absolute left-4 bottom-4">{cityName}</p>
            </a>
          )),
        )}
      </div>
    </div>
  </div>
);
