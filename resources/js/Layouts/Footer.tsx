import React from 'react';

export const Footer = () => (
  <>
    <div className="h-[36px]" />
    <footer className="absolute bottom-0 w-full bg-gray-900 p-2 text-white">
      <p className="text-center text-sm w-full">
        All Rights Reserved, The Mates Group Limited {new Date().getFullYear()}
      </p>
    </footer>
  </>
);
