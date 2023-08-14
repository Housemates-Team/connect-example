import React from 'react';
import { cn } from '@/lib/utils';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type CheckboxProps = {
  className?: string;
} & InputProps;

const Checkbox = (props: CheckboxProps) => (
  <input
    type="checkbox"
    {...props}
    className={cn(
      'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500',
      props.className,
    )}
  />
);

export { Checkbox };
