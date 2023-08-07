import classNames from 'classnames';
import React, { forwardRef } from 'react';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type TextInputProps = {
  className?: string;
} & InputProps;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...props }: TextInputProps, ref) => (
    <input
      {...props}
      ref={ref}
      className={classNames(
        'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm',
        className,
      )}
    />
  ),
);

TextInput.displayName = 'TextInput';

export default TextInput;
