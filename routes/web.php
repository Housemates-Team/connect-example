<?php

use App\Http\Controllers\ListingController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\ResultsController;
use App\Http\Controllers\CheckoutInitController;
use App\Http\Controllers\CheckoutStartController;
use App\Http\Controllers\CheckoutConfirmController;
use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home.index');
Route::get('/city/{city_slug}', [ResultsController::class, 'city'])->name('results.city');
Route::get('/university/{university_slug}', [ResultsController::class, 'university'])->name('results.university');
Route::get('/room/{room_id}', ListingController::class)->name('listing');
Route::post('/enquire', EnquiryController::class)->name('enquiry');
Route::post('/room/{room_id}/checkout/init', CheckoutInitController::class)->name('checkout.init');

Route::get('/room/{room_id}/checkout', CheckoutStartController::class)->name('checkout.start');
Route::get('/room/{room_id}/checkout/payment', [CheckoutConfirmController::class, 'create'])->name('checkout.payment');
Route::post('/room/{room_id}/checkout/confirm', [CheckoutConfirmController::class, 'store'])->name('checkout.confirm');
Route::get('/room/{room_id}/checkout/success', function (Request $request, $room_id) {
    /** @var \Housemates\ConnectApi\ApiClient $apiClient */
    $apiClient = app('apiClient');
    $roomResponse = $apiClient->getRoom($room_id)->jsonSerialize();

    $responseArray = json_decode(json_encode($roomResponse), true);

    return inertia('Checkout/Success', [
        'room' => $responseArray,
    ]);
})->name('checkout.success');

