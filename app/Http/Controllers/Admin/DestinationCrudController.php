<?php

namespace App\Http\Controllers\Admin;

use App\Models\Destination;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class DestinationCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(Destination::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/destination');
        CRUD::setEntityNameStrings('destination', 'destinations');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('name')->label('Name');
        CRUD::column('slug')->label('Slug');
        CRUD::column('is_featured')->label('Featured')->type('boolean');
        CRUD::column('is_active')->label('Active')->type('boolean');
        CRUD::column('sort_order')->label('Sort')->type('number');
        CRUD::orderBy('sort_order');
        CRUD::orderBy('name');
    }

    protected function setupCreateOperation(): void
    {
        CRUD::setValidation([
            'slug' => 'required|max:255|unique:destinations,slug,' . request()->route('id'),
            'name' => 'required|max:255',
        ]);

        CRUD::field('name')->label('Name')->type('text');
        CRUD::field('slug')->label('Slug')->type('text');
        CRUD::field('tag')->label('Tag')->type('text');
        CRUD::field('subtitle')->label('Subtitle')->type('textarea');
        CRUD::field('image_url')->label('Image URL')->type('text');
        CRUD::field('is_active')->label('Active')->type('boolean')->default(true);
        CRUD::field('is_featured')->label('Featured')->type('boolean')->default(false);
        CRUD::field('sort_order')->label('Sort order')->type('number')->default(0);
    }

    protected function setupUpdateOperation(): void
    {
        $this->setupCreateOperation();
    }
}

