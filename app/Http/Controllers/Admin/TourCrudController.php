<?php

namespace App\Http\Controllers\Admin;

use App\Models\Destination;
use App\Models\Tour;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class TourCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(Tour::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/tour');
        CRUD::setEntityNameStrings('tour', 'tours');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('title')->label('Title');
        CRUD::column('destination.name')->label('Destination');
        CRUD::column('duration')->label('Duration');
        CRUD::column('price')->label('Price')->type('number')->decimals(0);
        CRUD::column('is_featured')->label('Featured')->type('boolean');
        CRUD::column('is_active')->label('Active')->type('boolean');
        CRUD::column('sort_order')->label('Sort')->type('number');
        CRUD::orderBy('sort_order');
        CRUD::orderBy('created_at', 'desc');
    }

    protected function setupCreateOperation(): void
    {
        CRUD::setValidation([
            'slug' => 'required|max:255|unique:tours,slug,' . request()->route('id'),
            'title' => 'required|max:255',
        ]);

        CRUD::field('destination_id')
            ->label('Destination')
            ->type('select')
            ->entity('destination')
            ->model(Destination::class)
            ->attribute('name')
            ->tab('Basic');
        CRUD::field('title')->label('Title')->type('text')->tab('Basic');
        CRUD::field('slug')->label('Slug')->type('text')->tab('Basic');
        CRUD::field('summary')->label('Summary')->type('textarea')->tab('Basic');
        CRUD::field('description')->label('Description')->type('summernote')->tab('Content');
        CRUD::field('image_url')->label('Image URL')->type('text')->tab('Basic');
        CRUD::field('duration')->label('Duration')->type('text')->tab('Basic');
        CRUD::field('departure')->label('Departure')->type('text')->tab('Basic');
        CRUD::field('transport')->label('Transport')->type('text')->tab('Basic');
        CRUD::field('price')->label('Price')->type('number')->attributes(['step' => '0.01', 'min' => '0'])->tab('Pricing');
        CRUD::field('price_text')->label('Price text')->type('text')->tab('Pricing');
        CRUD::field('badge_text')->label('Badge text')->type('text')->tab('Marketing');
        CRUD::field('badge_type')->label('Badge type')->type('text')->hint('Examples: hot, sale, new, special')->tab('Marketing');
        CRUD::field('tags')->label('Tags')->type('textarea')->hint('One tag per line or comma separated.')->tab('Marketing');
        CRUD::field('filters')->label('Filters')->type('textarea')->hint('Examples: 3n2d, 4n3d, sale.')->tab('Marketing');
        CRUD::field('departure_dates')->label('Departure dates')->type('textarea')->hint('One date per line.')->tab('Pricing');
        CRUD::field('itinerary')->label('Itinerary')->type('summernote')->tab('Content');
        CRUD::field('includes')->label('Includes')->type('summernote')->tab('Content');
        CRUD::field('is_active')->label('Active')->type('boolean')->default(true)->tab('Settings');
        CRUD::field('is_featured')->label('Featured')->type('boolean')->default(false)->tab('Settings');
        CRUD::field('sort_order')->label('Sort order')->type('number')->default(0)->tab('Settings');
    }

    protected function setupUpdateOperation(): void
    {
        $this->setupCreateOperation();
    }
}

