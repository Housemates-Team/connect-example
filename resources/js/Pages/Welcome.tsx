import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

const Welcome = () => (
  <GuestLayout
    title={'Rooms'}
    renderHeader={() => (
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Unlinkers</h2>
        <p>Experts in student accommodation</p>
      </div>
    )}
  >
    <div className="max-w-4xl mx-auto py-10 sm:px-6 lg:px-8">
      <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen">
        <div className="max-w-7xl mx-auto -mt-40">
          <h2 className="text-7xl font-bold">Unlinkers 🥳</h2>
          <p className="text-xl mt-2">Booking student room couldn't be easier.</p>
          <div>
            <h4 className="text-2xl font-bold mt-8">Disclaimer</h4>
            <p className="text-lg mt-2">
              Even thought we use Housemates Connect API, we think our booking process is just
              better 🤣🤣{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  </GuestLayout>
);

export default Welcome;
