<?php

namespace App\Http\Controllers;

use Exception;
use App\Http\Requests\CreateEnquiryInput;
use Housemates\ConnectApi\Requests\EnquiryRequest;
use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Exceptions\ApiException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class EnquiryController extends Controller
{
    public function __invoke(CreateEnquiryInput $enquiry)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        $enquiry = (new EnquiryRequest)
            ->setContactNumber($enquiry->input('contact_number'))
            ->setEmail($enquiry->input('email'))
            ->setFirstName($enquiry->input('first_name'))
            ->setLastName($enquiry->input('last_name'))
            ->setMessage($enquiry->input('message'))
            ->setOperatorId($enquiry->input('operator_id'))
            ->setPropertyId($enquiry->input('property_id'))
            ->setRoomId($enquiry->input('room_id'));

        try {
            $response = $apiClient->createEnquiry($enquiry)->jsonSerialize();
            $responseArray = json_decode(json_encode($response), true);

            if ($responseArray['success'] != true) {
                Log::error('Got invalid api response: '.json_encode($responseArray));
                throw new Exception('Unknown error occured');
            }

        } catch (ApiException | Exception $e) {
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
