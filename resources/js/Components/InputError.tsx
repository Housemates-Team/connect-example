import React, { PropsWithChildren } from 'react';

type Props = {
  message?: string;
  className?: string;
}

export function InputError({ message, className, children }: PropsWithChildren<Props>) {
  if (!message && !children) {
    return null;
  }
  return (
    <div className={className}>
      <p className="text-sm text-red-600">{message || children}</p>
    </div>
  );
}
