import React, { PropsWithChildren } from 'react';

type Props = {
  value?: string;
  htmlFor?: string;
}

export function InputLabel({ value, htmlFor, children }: PropsWithChildren<Props>) {
  return (
    <label className="block font-medium text-sm text-gray-700" htmlFor={htmlFor}>
      {value || children}
    </label>
  );
}
