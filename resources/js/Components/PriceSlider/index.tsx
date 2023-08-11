import React, { useEffect, useState } from 'react';
import { RangeSlider } from '../RangeSlider';
import { PriceInput } from './PriceInput';

type PriceSliderProps = {
  defaultValue?: readonly [number, number];
  onPriceChange: (min: number, max: number) => void;
};

export const PriceSlider = ({ defaultValue, onPriceChange }: PriceSliderProps) => {
  const [prices, setPrices] = useState<readonly [number, number] | null>(defaultValue ?? null);

  const pricesWithDefault = prices ?? [0, 1000];
  return (
    <div>
      <RangeSlider
        domain={[0, 1000]}
        values={pricesWithDefault}
        onUpdate={(values: readonly [number, number]) => {
          onPriceChange(values[0], values[1]);
          setPrices([values[0], values[1]]);
        }}
        onChange={(values: readonly [number, number]) => {
          onPriceChange(values[0], values[1]);
          setPrices([values[0], values[1]]);
        }}
      />
      <div className="flex items-center px-5">
        <div className="flex mb-8">
          <PriceInput
            name="min-price"
            classes={{ root: 'mr-4' }}
            Label="Min per week"
            currencySymbol="£"
            maxValue={pricesWithDefault[1]}
            minValue={0}
            value={pricesWithDefault[0]}
            onChange={(newValue) =>
              setPrices((prevState) => [newValue, prevState?.[1] ?? pricesWithDefault[1]])
            }
          />
          <PriceInput
            name="max-price"
            Label="Max per week"
            currencySymbol="£"
            maxValue={1000}
            minValue={pricesWithDefault[0]}
            value={pricesWithDefault[1]}
            onChange={(newValue) =>
              setPrices((prevState) => [prevState?.[0] ?? pricesWithDefault[0], newValue])
            }
          />
        </div>
      </div>
    </div>
  );
};
