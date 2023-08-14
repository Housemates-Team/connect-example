import React, { useEffect, useState } from 'react';
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Button } from '@/Common/button';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitData: (data: any) => void;
  room_id: string;
};

// TODO: what to to with message
export function CheckoutForm({ submitData, room_id }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status as string) {
        case 'succeeded':
          //setMessage('Payment succeeded!');
          submitData(paymentIntent);
          break;
        case 'processing':
          //setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          //setMessage('Your payment was not successful, please try again.');
          break;
        default:
          //setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost/rooms/${room_id}/checkout/payment`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      //setMessage(error?.message as string);
    } else {
      //setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs' as const,
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={() => {
          //if (e?.target) {
          //setEmail(e.target.value);
          //}
        }}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} className={'mt-5'} />
      <div className="flex justify-end mt-5">
        <Button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={`mt-5 inline-flex px-5 py-3 items-center ${
            isLoading ? 'transition ease-in-out duration-150 cursor-not-allowed disabled' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            'Pay now'
          )}
        </Button>
      </div>
    </form>
  );
}
