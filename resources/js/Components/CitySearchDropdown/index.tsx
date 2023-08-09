import React, { useMemo, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

export type SearchLocation = { type: 'university' | 'city'; name: string; slug: string };

type CitySearchDropdownProps = {
  // when undefined show the default view
  locations: SearchLocation[];
  // The dropdown is open by default with the given locations
  defaultLocations: SearchLocation[];
};

export const CitySearchDropdown = ({ locations, defaultLocations }: CitySearchDropdownProps) => {
  const [hasText, setHasText] = useState(false);

  const shownLocations = hasText ? locations : defaultLocations;

  const [cities, universities] = useMemo(
    () => [
      shownLocations.filter(({ type }) => type === 'city'),
      shownLocations.filter(({ type }) => type === 'university'),
    ],
    [shownLocations],
  );

  return (
    <div className="mt-4 h-[170px] w-full relative">
      <div className="absolute w-full">
        <Command className="rounded-lg border shadow-md relative">
          <CommandInput
            onValueChange={(value: string) => setHasText(!!value?.length)}
            placeholder="Where do you want to study"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {cities.length !== 0 && (
              <CommandGroup heading="Cities">
                {cities?.map(({ name, slug }) => (
                  <CommandItem value={slug} key={slug}>
                    <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {universities.length !== 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Universities">
                  {universities.map(({ name, slug }) => (
                    <CommandItem value={slug} key={slug}>
                      <span>{name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </div>
    </div>
  );
};
