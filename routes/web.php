<?php

use App\Http\Controllers\ListingController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\ResultsController;
use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home.index');
Route::get('/city/{city_slug}', [ResultsController::class, 'city'])->name('results.city');
Route::get('/university/{university_slug}', [ResultsController::class, 'university'])->name('results.university');
Route::get('/room/{room_id}', ListingController::class)->name('listing');
Route::post('/enquire', EnquiryController::class)->name('enquiry');
Route::post('/rooms/{room_id}/checkout/init', function (Request $request, $room_id) {
    $request->session()->put('checkout.room_id', $room_id);
    $request->session()->put('checkout.booking_period_id', $request->booking_period_id);
    $request->session()->put('checkout.operator_id', $request->operator_id);

    return redirect()->back()->with('success', 'Room booking session initialized.');
})->name('checkout.init');

Route::get('/rooms/{room_id}/checkout', \App\Http\Controllers\CheckoutStartController::class)->name('checkout.start');
Route::get('/rooms/{room_id}/checkout/payment', [\App\Http\Controllers\CheckoutConfirmController::class,'create'])->name('checkout.payment');
Route::post('/rooms/{room_id}/checkout/confirm', [\App\Http\Controllers\CheckoutConfirmController::class,'store'])->name('checkout.confirm');
Route::get('/rooms/{room_id}/checkout/success', function (Request $request, $room_id) {
    /** @var \Housemates\ConnectApi\ApiClient $apiClient */
    $apiClient = app('apiClient');
    $roomResponse = $apiClient->getRoom($room_id)->jsonSerialize();

    $responseArray = json_decode(json_encode($roomResponse), true);

    return inertia('Checkout/Success', [
        'room' => $responseArray,
    ]);
})->name('checkout.success');

