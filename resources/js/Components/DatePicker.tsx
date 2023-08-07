import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const MonthYearPicker = () => {
  const renderMonthContent = (month: any, shortMonth: any, longMonth: any) => {
    const tooltipText = `Tooltip for quarter: ${longMonth}`;
    return <span title={tooltipText}>{shortMonth}</span>;
  };
  return (
    <DatePicker
      selected={new Date()}
      renderMonthContent={renderMonthContent}
      showQuarterYearPicker
      showMonthYearPicker
      dateFormat="MM/yyyy"
      onChange={(date: any) => console.log(date)}
    />
  );
};

export default MonthYearPicker;
