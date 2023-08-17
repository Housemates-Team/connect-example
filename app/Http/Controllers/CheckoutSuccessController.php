<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class CheckoutSuccessController extends Controller
{
    public function __invoke(Request $request, $room_id)
    {
        $checkoutParams = $request->session()->get('checkout');

        // Redirect the user if he has another checkout session active
        if ($checkoutParams == null || $checkoutParams['room']['id'] !== $room_id) {
            return redirect()->route('listing', [ 'room_id' => $room_id ]);
        }

        return inertia('Checkout/Success', [
            'room' => $checkoutParams['room'],
            'booking_period' => $checkoutParams['booking_period'],
        ]);
    }
}
