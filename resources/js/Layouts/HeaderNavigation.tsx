import React from 'react';

export const HeaderNavigation = () => (
  <header className="border-b border-gray-200">
    <div className="container flex h-14 items-center">
      <div>
        <a href="/" className="flex items-center mr-6 font-bold text-lg tracking-wide">
          <img alt="unilinker" className="w-10" src="/logo.svg" />
          <span>unilinker</span>
        </a>
      </div>
      <nav className="flex items-center gap-6 text-sm font-medium pt-1">
        {[
          { Label: 'Documentation', href: '#' },
          { Label: 'Cities', href: '#' },
          { Label: 'About us', href: '#' },
        ].map(({ Label, href }) => (
          <a
            key={Label}
            className="transition-colors hover:text-gray-700 text-gray-500"
            href={href}
          >
            {Label}
          </a>
        ))}
      </nav>
    </div>
  </header>
);
