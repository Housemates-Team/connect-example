<?php

use App\Http\Controllers\HostedCheckoutController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\ResultsController;
use App\Http\Controllers\CheckoutInitController;
use App\Http\Controllers\CheckoutStartController;
use App\Http\Controllers\CheckoutSuccessController;
use App\Http\Controllers\CheckoutConfirmController;
use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home.index');
Route::post('/next/logs', function (Request $request) {
    return response(
        content: 'test',
        status: 200,
        headers: [
            'X-VERCEL-VERIFY' => 'be307736390c88ebdf70af33bca595fc462aaeae',
        ]
    );
})->name('results.index');
Route::get('/city/{city_slug}', [ResultsController::class, 'city'])->name('results.city');
Route::get('/university/{university_slug}', [ResultsController::class, 'university'])->name('results.university');
Route::get('/room/{room_id}', ListingController::class)->name('listing');
Route::post('/enquire', EnquiryController::class)->name('enquiry');

Route::post('/room/{room_id}/checkout/hosted', HostedCheckoutController::class)
    ->name('hosted.checkout');

// Api Checkout Routes
Route::post('/room/{room_id}/checkout/init', CheckoutInitController::class)->name('checkout.init');
Route::get('/room/{room_id}/checkout', CheckoutStartController::class)->name('checkout.start');
Route::get('/room/{room_id}/checkout/payment', [CheckoutConfirmController::class, 'create'])->name('checkout.payment');
Route::post('/room/{room_id}/checkout/confirm', [CheckoutConfirmController::class, 'store'])->name('checkout.confirm');
Route::get('/room/{room_id}/checkout/success', CheckoutSuccessController::class)->name('checkout.success');

