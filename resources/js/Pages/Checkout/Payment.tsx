import React, { useEffect } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import { useReadLocalStorage } from 'usehooks-ts';
import GuestLayout from '@/Layouts/GuestLayout';
import Stripe from '@/Components/Stripe';
import { useForm } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

const Payment = () => {
    const page = useTypedPage();
    const route = useRoute();
    const checkoutData: any = useReadLocalStorage('checkoutData')
    const {room_id} = page.props
    const { formData, data } = checkoutData
    const { data: studentData, setData: setStudentData, post } = useForm({ ...formData, room_id})

    const handleSubmit = async (data:any) => {
        post(`/rooms/${room_id}/checkout/confirm`, {...setStudentData, })
    }

    return (
        <GuestLayout
            title={'Confirm payment'}
            renderHeader={() => (
                <div className='flex justify-between'>
                    <h2 className='font-semibold text-xl text-gray-800 leading-tight'>Unlinkers</h2>
                    <p>Experts in student accommodation</p>
                </div>
            )}
        >
            <div className='max-w-7xl mx-auto py-10 sm:px-6 lg:px-8'>
                <div className='space-y-5 mt-10'>
                    <div className='grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3'>
                        <div className='px-4 sm:px-0'>
                            <h2 className='text-base font-semibold leading-7 text-gray-900'>Payment
                                Information</h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>Make the required payment to complete reservation.</p>
                        </div>

                        <div className='bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2'>
                            <div className='px-4 py-6 sm:p-8'>
                                <Stripe data={data} submitData={handleSubmit} room_id={room_id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Payment;
