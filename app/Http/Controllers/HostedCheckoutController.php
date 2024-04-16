<?php

namespace App\Http\Controllers;

use Exception;
use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Exceptions\ApiException;
use Housemates\ConnectApi\Requests\CheckoutStartRequest;
use Illuminate\Http\Request;

class HostedCheckoutController extends Controller
{
    public function __invoke(Request $request, $room_id)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        $checkoutStartRequest = new CheckoutStartRequest;


        $checkoutStartRequest
            ->setRoomId($request->input('room_id'))
            ->setBookingPeriodId($request->input('booking_period_id'))
            ->setOperatorId($request->input('operator_id'));

        try{
            $checkoutStartResponse = $apiClient->startCheckout($checkoutStartRequest);
            $checkoutStartArray = json_decode(json_encode(
                $checkoutStartResponse->jsonSerialize()
            ), true);

            $checkoutData = $checkoutStartArray['data'];
            $checkoutUrl = data_get($checkoutData, 'checkout_url');

            return inertia()->location($checkoutUrl);

        }catch (ApiException | Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
