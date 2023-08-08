import { usePage } from '@inertiajs/react';
import { InertiaSharedProps } from '@/types';

export function useTypedPage<T = Record<string, unknown>>() {
  return usePage<InertiaSharedProps<T>>();
}
