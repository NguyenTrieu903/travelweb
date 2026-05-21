<?php

namespace App\Http\Controllers\Admin;

use App\Models\TravelService;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class TravelServiceCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(TravelService::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/travel-service');
        CRUD::setEntityNameStrings('service', 'services');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('name')->label('Name');
        CRUD::column('slug')->label('Slug');
        CRUD::column('badge')->label('Badge');
        CRUD::column('is_featured')->label('Featured')->type('boolean');
        CRUD::column('is_active')->label('Active')->type('boolean');
        CRUD::column('sort_order')->label('Sort')->type('number');
        CRUD::orderBy('sort_order');
        CRUD::orderBy('name');
    }

    protected function setupCreateOperation(): void
    {
        CRUD::setValidation([
            'slug' => 'required|max:255|unique:travel_services,slug,' . request()->route('id'),
            'name' => 'required|max:255',
        ]);

        CRUD::field('name')->label('Name')->type('text')->tab('Basic');
        CRUD::field('slug')->label('Slug')->type('text')->tab('Basic');
        CRUD::field('badge')->label('Badge')->type('text')->tab('Basic');
        CRUD::field('badge_icon')->label('Badge icon')->type('text')->tab('Basic');
        CRUD::field('summary')->label('Summary')->type('textarea')->tab('Basic');
        CRUD::field('description')->label('Description')->type('summernote')->tab('Content');
        CRUD::field('image_url')->label('Image URL')->type('text')->tab('Basic');
        CRUD::field('highlights')->label('Highlights')->type('summernote')->tab('Content');
        CRUD::field('includes')->label('Includes')->type('summernote')->tab('Content');
        CRUD::field('packages')->label('Packages')->type('summernote')->tab('Content');
        CRUD::field('process')->label('Process')->type('summernote')->tab('Content');
        CRUD::field('faq')->label('FAQ')->type('summernote')->tab('Content');
        CRUD::field('is_active')->label('Active')->type('boolean')->default(true)->tab('Settings');
        CRUD::field('is_featured')->label('Featured')->type('boolean')->default(false)->tab('Settings');
        CRUD::field('sort_order')->label('Sort order')->type('number')->default(0)->tab('Settings');
    }

    protected function setupUpdateOperation(): void
    {
        $this->setupCreateOperation();
    }
}

