<?php

namespace App\Http\Controllers;

use Exception;
use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Filters\RoomFilter;
use Housemates\ConnectApi\Filters\LocationFilter;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Http\Request;
use OpenAPI\Client\ApiException;

class ResultsController extends Controller
{
    public function city(Request $request, $city_slug)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        $data = $request->validate([
            'min_price' => 'integer|min:0|max:1000',
            'max_price' => 'integer|min:0|max:1000',
            'amenities.*' => 'string',
            'date' => 'string',
            'page' => 'integer'
        ]);

        $locationRaw = null;
        try {
            // Get location infos
            $filter = (new LocationFilter())->setCityFilter($city_slug);
            $response = $apiClient->getCities($filter)->jsonSerialize();
            $responseArrayFilters = json_decode(json_encode($response), true);
            $locationRaw = $responseArrayFilters['data']['items'][0] ?? null;

            $lat = $locationRaw['coordinates']['lat'];
            $lng = $locationRaw['coordinates']['long'];

            if ($locationRaw == null) {
                throw new NotFoundHttpException('Invalid location');
            }

            // Get search results
            $roomFilter = new RoomFilter();
            $roomFilter->setPerPageFilter(10);
            $roomFilter->setPageFilter($data['page'] ?? 1);

            if (isset($data['min_price']) && isset($data['max_price'])) {
                $priceFilter = '[min='.$data['min_price'].',max='.$data['max_price'].']';
                $roomFilter->setPriceRangeFilter($priceFilter);
            }


            if (isset($data['amenities'])) {
                $joinedArray = implode('.', array_map(function($x) {
                    return $x . '=true';
                }, $data['amenities']));

                $amenityFilter = '[' . $joinedArray . ']';
                $roomFilter->setAmenitiesFilter($amenityFilter);
            }

            if (isset($data['date'])) {
                $roomFilter->setMoveInDateFilter($data['date']);
            }

            $roomFilter->setGeoFenceFilter('[lat='.$lat.',long='.$lng.']');

            $response = $apiClient->getRooms($roomFilter);
            $responseJson = $response->jsonSerialize();
            $responseArray = json_decode(json_encode($responseJson), true);

            return inertia('Results/index', [
                'rooms' => $responseArray,
                'location' => [
                    'name' => $locationRaw['name'],
                    'slug' => $locationRaw['slug'],
                    'type' => 'city',
                ],
            ]);
        }catch (ApiException | Exception $e) {
            dd($e);
            if ($e instanceof ApiException) {
                dd($e->getResponseBody());
            } else {
                // TODO: ApiException don't work the way I expect, this is a temporary solution
                return inertia('Results/index', [
                    'no_rooms' => true,
                    'location' => $locationRaw ? [
                        'name' => $locationRaw['name'],
                        'slug' => $locationRaw['slug'],
                        'type' => 'city',
                    ] : null,
                ]);
            }

            return redirect()->route('/');
        }
    }

    public function university(Request $request, $university_slug)
    {
        return $this->city($request, $university_slug);
    }
}
