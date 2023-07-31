import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { Checkout } from '@/types';
// import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
let stripePromise: any = null

interface Props {
    data: Checkout;
    submitData: (data: any) => void;
    room_id: string;
}
export default function Stripe({data, submitData, room_id}: Props) {
    const [clientSecret, setClientSecret] = useState(data.stripe.client_secret);

    useEffect(() => {
        if (null === stripePromise){
            stripePromise = loadStripe(data.stripe.public_key)
        }
    },[])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm submitData={submitData} room_id={room_id} />
                </Elements>
            )}
        </div>
    );
}
