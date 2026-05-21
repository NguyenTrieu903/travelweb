<?php

namespace App\Http\Controllers\Admin;

use App\Models\TravelVideo;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class TravelVideoCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(TravelVideo::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/travel-video');
        CRUD::setEntityNameStrings('video', 'videos');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('title')->label('Title');
        CRUD::column('category_label')->label('Category');
        CRUD::column('is_featured')->label('Featured')->type('boolean');
        CRUD::column('is_active')->label('Active')->type('boolean');
        CRUD::column('sort_order')->label('Sort')->type('number');
        CRUD::orderBy('sort_order');
        CRUD::orderBy('created_at', 'desc');
    }

    protected function setupCreateOperation(): void
    {
        CRUD::setValidation([
            'title' => 'required|max:255',
            'video_url' => 'required|max:255',
        ]);

        CRUD::field('title')->label('Title')->type('text')->tab('Basic');
        CRUD::field('description')->label('Description')->type('textarea')->tab('Basic');
        CRUD::field('category')->label('Category key')->type('text')->tab('Basic');
        CRUD::field('category_label')->label('Category label')->type('text')->tab('Basic');
        CRUD::field('thumbnail_url')->label('Thumbnail URL')->type('text')->tab('Media');
        CRUD::field('video_url')->label('Video URL or YouTube ID')->type('text')->tab('Media');
        CRUD::field('is_local')->label('Local video file')->type('boolean')->default(false)->tab('Media');
        CRUD::field('duration')->label('Duration')->type('text')->tab('Media');
        CRUD::field('badge_text')->label('Badge text')->type('text')->tab('Marketing');
        CRUD::field('badge_type')->label('Badge type')->type('text')->tab('Marketing');
        CRUD::field('views_text')->label('Views text')->type('text')->tab('Marketing');
        CRUD::field('published_text')->label('Published text')->type('text')->tab('Marketing');
        CRUD::field('is_featured')->label('Featured')->type('boolean')->default(false)->tab('Settings');
        CRUD::field('is_active')->label('Active')->type('boolean')->default(true)->tab('Settings');
        CRUD::field('sort_order')->label('Sort order')->type('number')->default(0)->tab('Settings');
    }

    protected function setupUpdateOperation(): void
    {
        $this->setupCreateOperation();
    }
}

