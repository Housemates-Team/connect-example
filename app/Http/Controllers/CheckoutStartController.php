<?php

namespace App\Http\Controllers;


use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Requests\CheckoutStartRequest;
use Illuminate\Http\Request;
use OpenAPI\Client\ApiException;

class CheckoutStartController extends Controller
{
    public function __invoke(Request $request, $room_id)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');
        $checkoutStartRequest = new CheckoutStartRequest;
        $checkoutParams = $request->session()->get('checkout');
        $checkoutStartRequest
            ->setRoomId($room_id)
            ->setBookingPeriodId($checkoutParams['booking_period_id'])
            ->setOperatorId($checkoutParams['operator_id']);

        try{
            $checkoutStartResponse = $apiClient->startCheckout($checkoutStartRequest);
            $checkoutStartArray = json_decode(json_encode(
                $checkoutStartResponse->jsonSerialize()
            ), true);

            return inertia('Checkout/Create', [
                'checkout' => $checkoutStartArray,
                'room_id' => $room_id,
            ]);

        }catch (ApiException|\Exception $e){
            dd($e);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
