<?php

use App\Http\Controllers\Admin\ImageUploadController;
use App\Http\Controllers\Api\TravelContentApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Travel Web Routes
|--------------------------------------------------------------------------
|
| The public Travel site is still the current static frontend, copied under
| public/travel. Dynamic Travel controllers will replace these static pages
| incrementally as the database-backed content model is added.
|
*/

Route::redirect('/', '/travel/index.html')->name('home');

Route::get('/travel-data/{type}.js', [TravelContentApiController::class, 'script'])
    ->whereIn('type', ['tours', 'services', 'combos', 'gallery', 'videos'])
    ->name('travel-data.script');

Route::middleware(['web', 'auth:backpack'])->group(function () {
    Route::post('/admin/upload-image', [ImageUploadController::class, 'upload'])
        ->name('admin.upload-image');
    Route::post('/admin/upload-multiple-images', [ImageUploadController::class, 'uploadMultiple'])
        ->name('admin.upload-multiple-images');
    Route::delete('/admin/delete-image', [ImageUploadController::class, 'delete'])
        ->name('admin.delete-image');
});
