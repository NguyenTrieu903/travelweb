<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => config('backpack.base.route_prefix', 'admin'),
    'middleware' => array_merge(
        (array) config('backpack.base.web_middleware', 'web'),
        (array) config('backpack.base.middleware_key', 'admin')
    ),
    'namespace' => 'App\Http\Controllers\Admin',
], function () {
    Route::get('dashboard', 'DashboardController@index')->name('dashboard');
    Route::get('dashboard/chart-data', 'DashboardController@getChartData')->name('dashboard.chart-data');

    Route::crud('destination', 'DestinationCrudController');
    Route::crud('tour', 'TourCrudController');
    Route::crud('travel-service', 'TravelServiceCrudController');
    Route::crud('combo', 'ComboCrudController');
    Route::crud('gallery-item', 'GalleryItemCrudController');
    Route::crud('travel-video', 'TravelVideoCrudController');
    Route::crud('booking-request', 'BookingRequestCrudController');
    Route::crud('contact-request', 'ContactRequestCrudController');

    Route::prefix('files')->name('files.')->middleware('throttle:30,1')->group(function () {
        Route::post('upload-multiple-images', 'FileController@uploadMultipleImages')
            ->name('upload.multiple');
        Route::delete('delete-image', 'FileController@deleteImage')
            ->name('delete');
        Route::post('upload', 'FileUploadController@upload')
            ->name('upload');
        Route::get('{id}/download', 'FileUploadController@download')
            ->name('admin.download');
        Route::get('{id}/view', 'FileUploadController@view')
            ->name('admin.view');
    });
});

