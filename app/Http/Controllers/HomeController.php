<?php

namespace App\Http\Controllers;

use Exception;
use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Filters\LocationFilter;
use Housemates\ConnectApi\Exceptions\ApiException;

class HomeController extends Controller
{

    public function __invoke()
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');
        $locations = [];
        $filter = new LocationFilter();
        $filter->setPerPageFilter(10000);

        try {
            // Fetch all university locations
            $response = $apiClient->getUniversities($filter)->jsonSerialize();
            $responseArray = json_decode(json_encode($response), true);
            $items = $responseArray['data']['items'] ?? [];

            $locations = array_map(function ($item) {
                return [
                    'name' => $item['name'],
                    'slug' => $item['slug'],
                    'type' => 'university',
                ];
            }, $items);

            // Fetch all city locations
            $response = $apiClient->getCities($filter)->jsonSerialize();
            $responseArray = json_decode(json_encode($response), true);
            $items = $responseArray['data']['items'] ?? [];

            $collections = array_map(function ($item) {
                return [
                    'name' => $item['name'],
                    'slug' => $item['slug'],
                    'type' => 'city',
                ];
            }, $items);

            $locations = array_merge($locations, $collections);

            return inertia('Home/index', [ 'locations' => $locations ]);
        }catch (ApiException | Exception $e) {
            return redirect()->route('/');
        }
    }
}
