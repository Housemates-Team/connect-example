<?php

namespace App\Http\Controllers;

use Exception;
use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Exceptions\ApiException;
use Housemates\ConnectApi\Requests\EnquiryRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class GeneralEnquiryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        $enquiry = (new EnquiryRequest)
            ->setContactNumber($request->input('contact_number'))
            ->setEmail($request->input('email'))
            ->setFirstName($request->input('first_name'))
            ->setLastName($request->input('last_name'))
            ->setMessage($request->input('message'))
            ->setMetadata($request->input('metadata'));

        try {
            $response = $apiClient->createGeneralEnquiry($enquiry)->jsonSerialize();
            $responseArray = json_decode(json_encode($response), true);
            if ($responseArray['success'] != true) {
                Log::error('Got invalid api response: '.json_encode($responseArray));
                throw new Exception('Unknown error occured');
            }
            return back()->with('success', 'Your enquiry has been submitted successfully.');

        }catch (ApiException | Exception $e) {
            if ($e instanceof ApiException && str_contains($e->getMessage(), "The phone number is invalid.")) {
                throw ValidationException::withMessages([
                    'contact_number' => ['The phone number is invalid.'],
                ]);
            }

            Log::error($e);
            throw $e;
        }
    }
}
