import React from 'react';
import { useWindowSize } from 'usehooks-ts';
import Confetti from 'react-confetti';
import GuestLayout from '@/Layouts/GuestLayout';
import useTypedPage from '@/Hooks/useTypedPage';

const Success = () => {
    const { width, height } = useWindowSize();
    const page = useTypedPage();
    const { room } = page.props;

    return (
        <GuestLayout
            title={'Payment successful'}
            renderHeader={() => (
                <div className='flex justify-between'>
                    <h2 className='font-semibold text-xl text-gray-800 leading-tight'>Unlinkers</h2>
                    <p>Experts in student accommodation</p>
                </div>
            )}
        >
            <div className='max-w-7xl mx-auto py-10 sm:px-6 lg:px-8'>
                <Confetti
                    width={width}
                    height={height}
                />
                completed payment
            </div>
        </GuestLayout>
    );
};

export default Success;
