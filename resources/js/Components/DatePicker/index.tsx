import React from 'react';
import DatePicker from 'react-datepicker';
import { Input } from '@/Common/input';

import 'react-datepicker/dist/react-datepicker.css';
import './custom-styles.css';

type MonthYearPickerProps = {
  value: Date | null;
  onValueChange: (date: Date | null) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomMonthInput = ({ value, onClick }: any) => (
  <Input placeholder="Select a month" value={value.length ? value : undefined} onClick={onClick} />
);

export const MonthYearPicker = ({ value, onValueChange }: MonthYearPickerProps) => (
  <DatePicker
    customInput={<CustomMonthInput />}
    selected={value}
    renderMonthContent={(_, shortMonth, longMonth) => (
      <span title={`Tooltip for quarter: ${longMonth}`}>{shortMonth}</span>
    )}
    showQuarterYearPicker
    showMonthYearPicker
    dateFormat="MM/yyyy"
    onChange={(date) => onValueChange(date)}
  />
);
