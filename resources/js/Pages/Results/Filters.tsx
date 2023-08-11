import React from 'react';
import { MonthYearPicker } from '@/Components/DatePicker';
import { PriceSlider } from '@/Components/PriceSlider';

export const Filters = () => (
  <div className="w-[434px] bg-white border py-10 px-8">
    <div className="flex justify-between items-center">
      <h4 className="font-semibold">Filters</h4>
      <button>Clear all</button>
    </div>
    <div className="flex flex-col gap-4 mt-6">
      <p> Select price </p>
      <PriceSlider onPriceChange={(min, max) => {}} />
      <p> Select move in date </p>
      <MonthYearPicker />
      <p> Select features </p>
      <p> Sort by </p>
    </div>
  </div>
);
