import React, { useState } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

type AmenitiesPickerProps = {
  onValueChange: (value: string[] | null) => void;
};

const amenities = [
  {
    label: 'PAR',
    name: 'Parking',
  },
  {
    label: 'GYM',
    name: 'Gym',
  },
  {
    label: 'SA',
    name: 'Study Area',
  },
  {
    label: 'BKE',
    name: 'Bike Storage',
  },
  {
    label: 'WSH',
    name: 'Washing Machine',
  },
];

const AmenitiesPicker = ({ onValueChange }: AmenitiesPickerProps) => {
  const [picked, setPicked] = useState<Record<string, boolean>>({});

  const updateNewValues = () => {
    const filteredValues = Object.entries(picked)
      .filter(([_, v]) => v)
      .map(([k]) => k);

    onValueChange(filteredValues?.length ? filteredValues : null);
  };

  const toggle = (label: string) => () => {
    setPicked((all) => ({ ...all, [label]: !all[label] }));
    updateNewValues();
  };

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {amenities.map(({ label, name }) => (
        <Button className="px-8 relative" variant="secondary" key={name} onClick={toggle(label)}>
          {!!picked[label] && <CheckIcon className="absolute left-4" />}
          {name}
        </Button>
      ))}
    </div>
  );
};

export { AmenitiesPicker };
