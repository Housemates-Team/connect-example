<?php

namespace App\Http\Controllers;

use Exception;
use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Filters\LocationFilter;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\RoomResultsInput;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Housemates\ConnectApi\Exceptions\ApiException;

class ResultsController extends Controller
{
    public function city(RoomResultsInput $results, $city_slug)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        // Get location infos
        $filter = (new LocationFilter())->setCityFilter($city_slug);
        $response = $apiClient->getCities($filter)->jsonSerialize();
        $responseArrayFilters = json_decode(json_encode($response), true);
        $locationRaw = $responseArrayFilters['data']['items'][0] ?? null;

        if ($locationRaw == null) {
            throw new NotFoundHttpException('Invalid location');
        }

        return $this->getSearchResponse($results, [
            'name' => $locationRaw['name'],
            'slug' => $locationRaw['slug'],
            'lat' => $locationRaw['coordinates']['lat'],
            'lng' => $locationRaw['coordinates']['long'],
            'type' => 'city',
        ]);
    }

    public function university(RoomResultsInput $results, $university_slug)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        // Get location infos
        $filter = (new LocationFilter())->setUniversityFilter($university_slug);
        $response = $apiClient->getUniversities($filter)->jsonSerialize();
        $responseArrayFilters = json_decode(json_encode($response), true);
        $locationRaw = $responseArrayFilters['data']['items'][0] ?? null;

        if ($locationRaw == null) {
            throw new NotFoundHttpException('Invalid location');
        }

        return $this->getSearchResponse($results, [
            'name' => $locationRaw['name'],
            'slug' => $locationRaw['slug'],
            'lat' => $locationRaw['coordinates']['lat'],
            'lng' => $locationRaw['coordinates']['long'],
            'city' => $locationRaw['city'],
            'type' => 'university',
        ]);
    }

    private function getSearchResponse(RoomResultsInput $results, $location) {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        try {
            // Get search results
            $roomFilter = $results->toRoomFilter();
            $roomFilter->setPerPageFilter(10);
            $roomFilter->setGeoFenceFilter(sprintf('[lat=%s,long=%s]', $location['lat'], $location['lng']));

            $response = $apiClient->getRooms($roomFilter);
            $responseJson = $response->jsonSerialize();
            $responseArray = json_decode(json_encode($responseJson), true);

            return inertia('Results/index', [
                'rooms' => $responseArray,
                'location' => $location,
            ]);
        } catch (ApiException | Exception $e) {
            if ($e instanceof ApiException && str_contains($e->getMessage(), "api.room_type_not_found")) {
                return inertia('Results/index', [
                    'no_rooms' => true,
                    'location' => $location,
                ]);
            }

            Log::error($e);
            throw $e;
        }
    }
}
