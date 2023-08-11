import React, { useState } from 'react';
import { PriceSlider } from '@/Components/PriceSlider';
import { MonthYearPicker } from '@/Components/DatePicker';
import { AmenitiesPicker } from '@/Components/AmenitiesPicker';
import { Button } from '@/components/ui/button';

export const Filters = () => {
  const [prices, setPrices] = useState<[number, number] | undefined>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [amenities, setAmenities] = useState<string[] | undefined>();

  const applyFilters = () => {
    const filters = {
      min_price: prices?.[0],
      max_price: prices?.[1],
      date: date,
      amenities: amenities && JSON.stringify(amenities),
    };

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', '1');
    Object.entries(filters)
      .filter(([k, v]) => v)
      .forEach(([k, v]) => {
        queryParams.set(k, String(v));
      });

    // Construct the new URL with the updated page parameter
    const newUrl = [
      window.location.origin,
      window.location.pathname,
      `?${queryParams.toString()}`,
    ].join('');

    window.location.href = newUrl;
  };

  return (
    <div className="w-[434px] bg-white border py-10 px-8">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">Filters</h4>
        <div className="flex gap-2">
          <Button variant="outline">Clear</Button>
          <Button onClick={applyFilters}>Apply</Button>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-8">
        <div>
          <p className="mb-6 font-semibold text-sm"> Select price </p>
          <PriceSlider onPriceChange={(min, max) => setPrices([min, max])} />
        </div>
        <div>
          <p className="mb-4 font-semibold text-sm"> Select move in date </p>
          <MonthYearPicker onValueChange={(date) => setDate(date ?? undefined)} />
        </div>
        <div>
          <p className="mb-4 font-semibold text-sm"> Select features </p>
          <AmenitiesPicker onValueChange={(values) => setAmenities(values ?? undefined)} />
        </div>
        {/*<p> Sort by </p>*/}
      </div>
    </div>
  );
};
