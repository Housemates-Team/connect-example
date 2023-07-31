<?php

namespace App\Http\Controllers;

use Exception;
use Housemates\ConnectApi\ApiClient;
use Housemates\ConnectApi\Filters\RoomFilter;
use Illuminate\Http\Request;
use OpenAPI\Client\ApiException;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');
        $roomData = [];
        $roomFilter = new RoomFilter();
        $roomFilter->setPerPageFilter(10);
        $roomFilter->setPageFilter($request->get('page', 1));

        try {
            $response = $apiClient->getRooms($roomFilter)->jsonSerialize();
            $responseArray = json_decode(json_encode($response), true);

            $data = $responseArray['data']['items'];
            $meta = $responseArray['data']['meta'];
            $links = $responseArray['data']['links'];

            $meta = collect($meta['links'])->map(function ($link) {
                if ($link['url'] === null) {
                    return $link;
                }
                $link['url'] = str_replace('https://api.dev-housemates.io/api', 'http://unilinkers.test', $link['url']);
                return $link;
            })->toArray();

            $links = collect($links)->mapWithKeys(function ($link, $key) {
                if ($link === null) {
                    return [$key => $link];
                }
                 $link = str_replace('https://api.dev-housemates.io/api', 'http://unilinkers.test', $link);
                return [$key => $link];
            })->toArray();

            $responseArray['data']['meta']['links'] = $meta;
            $responseArray['data']['links'] = $links;


            return inertia('Rooms/Index', [
                'rooms' => $responseArray,
            ]);
        }catch (ApiException | Exception $e) {
            dd($e);
            return redirect()->route('/');
        }
    }

    public function show(string $roomId)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        try {
            $response = $apiClient->getRoom($roomId)->jsonSerialize();
            $responseArray = json_decode(json_encode($response), true);

            return inertia('Rooms/Show', [
                'room' => $responseArray,
            ]);
        }catch (ApiException | Exception $e) {
            return redirect()->route('/');
        }
    }
}
