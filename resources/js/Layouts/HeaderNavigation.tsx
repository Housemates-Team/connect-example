import React from 'react';

export const HeaderNavigation = () => (
  <header className="border-b border-gray-200">
    <div className="container flex h-14 items-center">
      <div>
        <a href="/" className="flex gap-2 items-center mr-6 font-bold text-lg tracking-wide">
          unilinker
        </a>
      </div>
      <nav className="flex items-center gap-6 text-sm font-medium pt-1">
        {[
          { label: 'Documentation', href: '#' },
          { label: 'Cities', href: '#' },
          { label: 'About us', href: '#' },
        ].map(({ label, href }) => (
          <a
            key={label}
            className="transition-colors hover:text-gray-700 text-gray-500"
            href={href}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  </header>
);
