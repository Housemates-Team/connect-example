import React, { useState } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { Button } from '@/Common/button';

type AmenitiesPickerProps = {
  defaultValue: string[] | null;
  onValueChange: (value: string[] | null) => void;
};

const amenities = [
  { name: 'Double Bed', label: 'DBD' },
  { name: 'Desk & Chair', label: 'DSK' },
  { name: 'Microwave', label: 'MRW' },
  { name: 'Security Access', label: 'PIN' },
  { name: 'Private Bathroom', label: 'PBA' },
  { name: 'Wifi', label: 'WIF' },
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

  const toggle = (label: string) => () => {
    updateNewValues({ ...picked, [label]: !picked[label] });
    setPicked((all) => ({ ...all, [label]: !all[label] }));
  };

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {amenities.map(({ label, name }) => (
        <Button className="px-10 relative" variant="secondary" key={name} onClick={toggle(label)}>
          {!!picked[label] && <CheckIcon className="absolute left-4" />}
          {name}
        </Button>
      ))}
    </div>
  );
};

export { AmenitiesPicker };
