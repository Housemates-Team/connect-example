<?php

use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome/index');
});

Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
Route::get('/rooms/{roomId}', [RoomController::class, 'show'])->name('rooms.show');
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

