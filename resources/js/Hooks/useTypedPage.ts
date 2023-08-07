import { usePage } from '@inertiajs/react';
import { InertiaSharedProps } from '@/types';

export default function useTypedPage<T = Record<string, unknown>>() {
  return usePage<InertiaSharedProps<T>>();
}
