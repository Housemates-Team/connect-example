import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { Checkout } from '@/types';
import { CheckoutForm } from './CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let stripePromise: any = null;

type Props = {
  data: Checkout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitData: (data: any) => void;
  room_id: string;
};
export function Stripe({ data, submitData, room_id }: Props) {
  useEffect(() => {
    if (null === stripePromise) {
      stripePromise = loadStripe(data.stripe.public_key);
    }
  }, []);

  const appearance = { theme: 'stripe' as const };
  const clientSecret: string | undefined = data.stripe.client_secret;

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <CheckoutForm submitData={submitData} room_id={room_id} />
        </Elements>
      )}
    </div>
  );
}
