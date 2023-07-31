<?php

namespace App\Http\Controllers;

use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Exceptions\ApiException;
use Housemates\ConnectApi\Requests\CheckoutCompleteRequest;
use Illuminate\Http\Request;

class CheckoutConfirmController extends Controller
{
    public function create($room_id)
    {
        return inertia('Checkout/Payment', [
            'room_id' => $room_id,
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
        }catch (ApiException|\Exception $e){
            dd($e);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
