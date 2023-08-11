import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type MonthYearPickerProps = {
  onValueChange: (date: Date | null) => void;
};

const MonthYearPicker = ({ onValueChange }: MonthYearPickerProps) => (
  <DatePicker
    selected={new Date()}
    renderMonthContent={(_, shortMonth, longMonth) => (
      <span title={`Tooltip for quarter: ${longMonth}`}>{shortMonth}</span>
    )}
    showQuarterYearPicker
    showMonthYearPicker
    dateFormat="MM/yyyy"
    onChange={(date) => onValueChange(date)}
  />
);

export { MonthYearPicker };
