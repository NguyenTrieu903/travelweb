<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TravelContentApiController;

/*
|--------------------------------------------------------------------------
| Travel API Routes
|--------------------------------------------------------------------------
|
| Travel-specific endpoints expose the database-backed content used by the
| static frontend bridge and public request forms.
|
*/

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'app' => config('app.name'),
    ]);
})->name('api.health');

Route::prefix('travel')->name('api.travel.')->group(function () {
    Route::get('/tours', [TravelContentApiController::class, 'tours'])->name('tours');
    Route::get('/services', [TravelContentApiController::class, 'services'])->name('services');
    Route::get('/combos', [TravelContentApiController::class, 'combos'])->name('combos');
    Route::get('/gallery', [TravelContentApiController::class, 'gallery'])->name('gallery');
    Route::get('/videos', [TravelContentApiController::class, 'videos'])->name('videos');
    Route::post('/booking-requests', [TravelContentApiController::class, 'storeBooking'])->name('booking-requests.store');
    Route::post('/contact-requests', [TravelContentApiController::class, 'storeContact'])->name('contact-requests.store');
});
