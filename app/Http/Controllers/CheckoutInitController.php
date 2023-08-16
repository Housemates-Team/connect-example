<?php

namespace App\Http\Controllers;

use Housemates\ConnectApi\ApiClient;
use Illuminate\Http\Request;

class CheckoutInitController extends Controller
{
    public function __invoke(Request $request, $room_id)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        $roomResponse = $apiClient->getRoom($room_id)->jsonSerialize();
        $roomResponse = json_decode(json_encode($roomResponse), true);
        $room = $roomResponse['data']['item'];

        $bookingPeriods = $room['booking_periods'];
        $bookingPeriod = array_filter($bookingPeriods, function ($bookingPeriod) use ($request) {
            return $bookingPeriod['id'] == $request->booking_period_id;
        })[0] ?? null;

        // This route will store the information of the current user checkout session
        $request->session()->put('checkout.room', $room);
        $request->session()->put('checkout.booking_period', $bookingPeriod);
        $request->session()->put('checkout.operator_id', $request->operator_id);

        return redirect()->back()->with('success', 'Room booking session initialized.');
    }
}
