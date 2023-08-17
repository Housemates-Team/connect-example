<?php

namespace App\Http\Controllers;

use Housemates\ConnectApi\ApiClient;
use Illuminate\Validation\ValidationException;
use Housemates\ConnectApi\Exceptions\ApiException;
use Housemates\ConnectApi\Requests\CheckoutCompleteRequest;
use Illuminate\Http\Request;

class CheckoutConfirmController extends Controller
{
    public function create(Request $request, $room_id)
    {
        $checkoutParams = $request->session()->get('checkout');

        // Redirect the user if he has another checkout session active
        if ($checkoutParams == null || $checkoutParams['room']['id'] !== $room_id) {
            return redirect()->route('listing', [ 'room_id' => $room_id ]);
        }

        return inertia('Checkout/Payment', [
            'room' => $checkoutParams['room'],
            'booking_period' => $checkoutParams['booking_period'],
            'application_url' => config('app.url'),
        ]);
    }

    public function store(Request $request)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');
        $checkoutCompleteRequest = new CheckoutCompleteRequest();
        $checkoutCompleteRequest
            ->setSessionToken($request->input('session_token'))
            ->setPayingInInstallments($request->input('paying_in_instalments'))
            ->setHasUkBasedGuarantor($request->input('has_uk_based_guarantor'))
            ->setIsUsingHousingHand($request->input('is_using_housing_hand'))
            ->setResidentDetails($request->input('resident_details'))
            ->setSupportingContactDetails($request->input('supporting_contact_details'))
            ->setCourseDetails($request->input('course_details'))
            ->setRoomId($request->input('room_id'));

        try {
            $apiClient->completeCheckout($checkoutCompleteRequest);
            return redirect()->route('checkout.success', [
                'room_id' => $request->input('room_id'),
            ]);
        } catch (ApiException | \Exception $e){
            if ($e instanceof ApiException && str_contains($e->getMessage(), "api.booking_already_completed")) {
                return redirect()->route('checkout.success', [
                    'room_id' => $request->input('room_id'),
                ]);
            }
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
