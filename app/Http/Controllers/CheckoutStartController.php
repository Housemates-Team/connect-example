<?php

namespace App\Http\Controllers;


use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Requests\CheckoutStartRequest;
use Illuminate\Http\Request;
use Housemates\ConnectApi\Exceptions\ApiException;

class CheckoutStartController extends Controller
{
    public function __invoke(Request $request, $room_id)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        $checkoutStartRequest = new CheckoutStartRequest;
        $checkoutParams = $request->session()->get('checkout');

        // Redirect the user if he has another checkout session active
        if ($checkoutParams == null || $checkoutParams['room']['id'] !== $room_id) {
            return redirect()->route('listing', [ 'room_id' => $room_id ]);
        }

        $checkoutStartRequest
            ->setRoomId($room_id)
            ->setBookingPeriodId($checkoutParams['booking_period']['id'])
            ->setOperatorId($checkoutParams['operator_id']);

        try{
            $checkoutStartResponse = $apiClient->startCheckout($checkoutStartRequest);
            $checkoutStartArray = json_decode(json_encode(
                $checkoutStartResponse->jsonSerialize()
            ), true);

            return inertia('Checkout/Create', [
                'room' => $checkoutParams['room'],
                'booking_period' => $checkoutParams['booking_period'],
                'checkout' => $checkoutStartArray,
            ]);

        }catch (ApiException | \Exception $e){
            dd($e);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
