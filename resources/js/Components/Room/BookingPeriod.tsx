import React from 'react';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { router } from '@inertiajs/core';
import { useRoute } from '@/Hooks/useRoute';
import { PrimaryButton } from '@/Components/PrimaryButton';
import { BookingPeriod as BookingPeriodType } from '@/types';

dayjs.extend(customParseFormat);

type Props = {
  room_id: string;
  period: BookingPeriodType;
  operator_id: string;
}

const BookingPeriod = ({ room_id, period, operator_id }: Props) => {
  const route = useRoute();
  const convertToDate = (dateString: string) => {
    return dayjs(dateString, 'DD-MM-YYYY').format('MMMM, YYYY');
  };
  const { post } = useForm({
    booking_period_id: period.id,
    operator_id: operator_id,
  });

  const handleBookingPeriodClick = () => {
    post(route('checkout.init', { room_id }), {
      preserveScroll: true,
      replace: true,
      onSuccess: () => router.visit(route('checkout.start', { room_id })),
      onError: (e) => {
        console.log(e);
      },
    });
  };

  const bookingPeriodDuration = (start_date: string, end_date: string) => {
    const startDate = dayjs(start_date, 'DD-MM-YYYY');
    const endDate = dayjs(end_date, 'DD-MM-YYYY');
    return endDate.diff(startDate, 'week');
  };
  return (
    <button
      type="button"
      className="mt-5 py-3 px-5 rounded bg-gray-100 hover:bg-gray-50 cursor-pointer relative flex items-center justify-between"
      onClick={() => handleBookingPeriodClick()}
      key={period.id}
    >
      <div>
        <p className="font-bold text-gray-600">
          {bookingPeriodDuration(period.start_date, period.end_date)} Weeks
        </p>
        <p className="font-medium text-sm text-gray-600">
          <span className="">
            {convertToDate(period.start_date)} -{convertToDate(period.end_date)}
          </span>
        </p>
        <p className="font-bold mt-2">{period.price_per_week}</p>
      </div>
      <div>
        <PrimaryButton>Book Now</PrimaryButton>
      </div>
    </button>
  );
};

export { BookingPeriod };
