import React, { useState } from 'react';
import { PriceSlider } from '@/Components/PriceSlider';
import { MonthYearPicker } from '@/Components/DatePicker';
import { AmenitiesPicker } from '@/Components/AmenitiesPicker';
import { Button } from '@/components/ui/button';

type Filter = {
  prices?: readonly [number, number];
  date?: Date;
  amenities?: string[];
};

type FiltersProps = {
  defaultFilters: Filter;
  onFilterChange: (filters: Filter) => void;
};

export const Filters = ({ defaultFilters, onFilterChange }: FiltersProps) => {
  const [prices, setPrices] = useState<readonly [number, number] | undefined>(
    defaultFilters?.prices,
  );
  const [date, setDate] = useState<Date | undefined>(defaultFilters?.date);
  const [amenities, setAmenities] = useState<string[] | undefined>(defaultFilters?.amenities);

  const applyFilters = () => onFilterChange({ prices, date, amenities });
  const clearFilters = () => {
    setPrices(undefined);
    setDate(undefined);
    setAmenities(undefined);
    onFilterChange({ prices: undefined, date: undefined, amenities: undefined });
  };

  return (
    <div className="w-[434px] sticky h-min top-8 bg-white border py-10 px-8">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">Filters</h4>
        <div className="flex gap-2">
          <Button onClick={clearFilters} variant="outline">
            Clear
          </Button>
          <Button onClick={applyFilters}>Apply</Button>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-8">
        <div>
          <p className="mb-6 font-semibold text-sm"> Select price </p>
          <PriceSlider
            defaultValue={prices}
            onPriceChange={(min, max) => {
              console.info(123);
              setPrices([min, max]);
            }}
          />
        </div>
        <div>
          <p className="mb-4 font-semibold text-sm"> Select move in date </p>
          <MonthYearPicker onValueChange={(date) => setDate(date ?? undefined)} />
        </div>
        <div>
          <p className="mb-4 font-semibold text-sm"> Select features </p>
          <AmenitiesPicker
            defaultValue={amenities ?? null}
            onValueChange={(values) => setAmenities(values ?? undefined)}
          />
        </div>
        {/*<p> Sort by </p>*/}
      </div>
    </div>
  );
};
