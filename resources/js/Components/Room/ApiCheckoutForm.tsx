import React from 'react';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { router } from '@inertiajs/core';
import { useRoute } from '@/Hooks/useRoute';
import { BookingPeriod as BookingPeriodType } from '@/types';

dayjs.extend(customParseFormat);

type Props = {
    room_id: string;
    period: BookingPeriodType;
    operator_id: string;
};

const ApiCheckoutForm = ({ room_id, period, operator_id }: Props) => {
    const route = useRoute();
    const { post } = useForm({
        booking_period_id: period.id,
        operator_id: operator_id,
    });

    const handleBookingPeriodClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('checkout.init', { room_id }), {
            preserveScroll: true,
            replace: true,
            onSuccess: () => router.visit(route('checkout.start', { room_id })),
            onError: (e) => {
                console.error(e);
            },
        });
    };

    return (
        <form className='flex justify-end w-full' onSubmit={handleBookingPeriodClick}>
            <button
                type='submit'
                className='bg-gray-100 text-sm uppercase font-semibold w-full py-2.5 px-[1.15rem] rounded-br border-l border-gray-200 text-black hover:bg-gray-700 hover:text-white transition'
            >
                Api Checkout
            </button>
        </form>
    );
};

export { ApiCheckoutForm };
