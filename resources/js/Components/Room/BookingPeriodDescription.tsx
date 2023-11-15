import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BookingPeriod as BookingPeriodType } from '@/types';
import HostedCheckoutForm from '@/Components/Room/HostedCheckoutForm';
import { ApiCheckoutForm } from '@/Components/Room/ApiCheckoutForm';

dayjs.extend(customParseFormat);

type Props = {
    period: BookingPeriodType;
    operator_id: string;
    room_id: string;
};

const BookingPeriodDescription = ({ period, operator_id, room_id }: Props) => {
    const convertToDate = (dateString: string) => {
        return dayjs(dateString, 'DD-MM-YYYY').format('MMMM, YYYY');
    };

    const bookingPeriodDuration = (start_date: string, end_date: string) => {
        const startDate = dayjs(start_date, 'DD-MM-YYYY');
        const endDate = dayjs(end_date, 'DD-MM-YYYY');
        return endDate.diff(startDate, 'week');
    };

    return (
        <div className="border pt-3 rounded-lg mt-5">
            <div className="px-5">
                <p className="font-bold text-gray-600">
                    {bookingPeriodDuration(period.start_date, period.end_date)} Weeks
                </p>
                <p className="font-medium text-sm text-gray-600">
                    <span className="">
                      {convertToDate(period.start_date)} -{convertToDate(period.end_date)}
                    </span>
                </p>
                <p className="font-bold mt-2">{period.price_per_week} / week</p>
            </div>
            <div className="border-t border-gray-200 flex items-center justify-between mt-5">
                <div className="w-1/2">
                    <HostedCheckoutForm
                        room_id={room_id}
                        operator_id={operator_id}
                        booking_period_id={period.id}
                    />
                </div>
                <div className="w-1/2">
                    <ApiCheckoutForm
                      period={period}
                      operator_id={operator_id}
                      room_id={room_id}
                    />
                </div>

            </div>
        </div>
    );
}

export default BookingPeriodDescription;
