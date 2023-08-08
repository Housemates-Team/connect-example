import classNames from 'classnames';
import React from 'react';

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
    className={classNames(
      'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500',
      props.className,
    )}
  />
);

export { Checkbox };
