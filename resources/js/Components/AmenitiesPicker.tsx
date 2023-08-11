import React, { useState } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

type AmenitiesPickerProps = {
  defaultValue: string[] | null;
  onValueChange: (value: string[] | null) => void;
};

const amenities = [
  {
    Label: 'PAR',
    name: 'Parking',
  },
  {
    Label: 'GYM',
    name: 'Gym',
  },
  {
    Label: 'SA',
    name: 'Study Area',
  },
  {
    Label: 'BKE',
    name: 'Bike Storage',
  },
  {
    Label: 'WSH',
    name: 'Washing Machine',
  },
];

const AmenitiesPicker = ({ defaultValue, onValueChange }: AmenitiesPickerProps) => {
  const [picked, setPicked] = useState<Record<string, boolean>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => defaultValue?.reduce((acc, v) => ({ ...acc, [v]: true }), {} as any) ?? {},
  );

  const updateNewValues = (newValues: Record<string, boolean>) => {
    const filteredValues = Object.entries(newValues)
      .filter(([_, v]) => v)
      .map(([k]) => k);

    onValueChange(filteredValues?.length ? filteredValues : null);
  };

  const toggle = (Label: string) => () => {
    updateNewValues({ ...picked, [Label]: !picked[Label] });
    setPicked((all) => ({ ...all, [Label]: !all[Label] }));
  };

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {amenities.map(({ Label, name }) => (
        <Button className="px-8 relative" variant="secondary" key={name} onClick={toggle(Label)}>
          {!!picked[Label] && <CheckIcon className="absolute left-4" />}
          {name}
        </Button>
      ))}
    </div>
  );
};

export { AmenitiesPicker };
