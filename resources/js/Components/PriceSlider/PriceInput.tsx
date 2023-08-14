import React, { ReactElement, Ref } from 'react';
import clsx from 'clsx';

type PriceInputProps = {
  name: string;
  Label: string;
  value: number;
  classes?: {
    root?: string;
    input?: string;
  };
  onChange: (newValue: number) => void;
  minValue: number;
  maxValue: number;
  currencySymbol: string;
  inputRef?: Ref<HTMLInputElement>;
};

const UPPER_BOUNDARY = 1000;

export const PriceInput = ({
  onChange,
  Label,
  minValue,
  maxValue,
  classes,
  value,
  currencySymbol,
  name,
  inputRef,
}: PriceInputProps): ReactElement => {
  const isErroneous = value < minValue || value > maxValue;

  return (
    <div className={classes?.root}>
      <p className="hm-body-sm mb-1">{Label}</p>
      <div className={clsx('border border-wool flex', isErroneous && 'border-flamingo')}>
        <div className="px-2 py-2 hm-body-semi border-r border-wool bg-wool">{currencySymbol}</div>
        <input
          onChange={(e) => {
            e.persist();
            const newValue = Number(e.target.value);
            if (Number.isNaN(newValue)) return;
            onChange(newValue > UPPER_BOUNDARY ? UPPER_BOUNDARY : newValue);
          }}
          ref={inputRef}
          type="tel"
          className={clsx('hm-body focus:outline-none ml-2 w-32', classes?.input)}
          name={name}
          value={String(value).replace(/^0+/, '') || '0'}
        />
      </div>
    </div>
  );
};
