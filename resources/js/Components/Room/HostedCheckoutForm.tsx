import { useForm } from '@inertiajs/react';
import React from 'react';
import { useRoute } from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';

type Props = {
  room_id: string;
  booking_period_id: string;
  operator_id: string;
};

function HostedCheckoutForm({ room_id, booking_period_id, operator_id }: Props) {
  const route = useRoute();
  const { post } = useForm({
    booking_period_id: booking_period_id,
    operator_id: operator_id,
    room_id: room_id,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('hosted.checkout', { room_id }));
  };
  return (
    <form className="flex justify-end w-full" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="bg-gray-100 font-semibold text-sm uppercase w-full py-2.5 px-[1.15rem] rounded-bl text-black hover:bg-gray-700 hover:text-white transition"
      >
        Hosted Checkout
      </button>
    </form>
  );
}

export default HostedCheckoutForm;
