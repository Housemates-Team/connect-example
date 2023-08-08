import React from 'react';
import { useWindowSize } from 'usehooks-ts';
import Confetti from 'react-confetti';
import { Head } from '@inertiajs/react';
import { Banner } from '@/Components/Banner';
import { HeaderNavigation } from '@/Layouts/HeaderNavigation';

const Success = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Head title="Payment successful" />
      <Banner />
      <HeaderNavigation />
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <Confetti width={width} height={height} />
        completed payment
      </div>
    </>
  );
};

export default Success;
