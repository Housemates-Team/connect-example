<?php

use App\Http\Controllers\GeneralEnquiryController;
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
Route::get('/city/{city_slug}', [ResultsController::class, 'city'])->name('results.city');
Route::get('/university/{university_slug}', [ResultsController::class, 'university'])->name('results.university');
Route::get('/room/{room_id}', ListingController::class)->name('listing');
Route::post('/enquire', EnquiryController::class)->name('enquiry');
Route::post('enquiry/general', GeneralEnquiryController::class)->name('enquiry.general');

Route::post('/room/{room_id}/checkout/hosted', HostedCheckoutController::class)
    ->name('hosted.checkout');

// Api Checkout Routes
Route::post('/room/{room_id}/checkout/init', CheckoutInitController::class)->name('checkout.init');
Route::get('/room/{room_id}/checkout', CheckoutStartController::class)->name('checkout.start');
Route::get('/room/{room_id}/checkout/payment', [CheckoutConfirmController::class, 'create'])->name('checkout.payment');
Route::post('/room/{room_id}/checkout/confirm', [CheckoutConfirmController::class, 'store'])->name('checkout.confirm');
Route::get('/room/{room_id}/checkout/success', CheckoutSuccessController::class)->name('checkout.success');


Route::post('/webhooks', function (Request $request) {
    Log::info($request->all());
    // dd('yes');
    return response()->json([
        'success' => true
    ]);
});
