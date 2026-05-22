<?php

namespace App\Http\Controllers\Admin;

use App\Models\Combo;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class ComboCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(Combo::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/combo');
        CRUD::setEntityNameStrings('combo', 'combos');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('name')->label('Name');
        CRUD::column('destination')->label('Destination');
        CRUD::column('duration')->label('Duration');
        CRUD::column('new_price')->label('Price')->type('number')->decimals(0);
        CRUD::column('is_featured')->label('Featured')->type('boolean');
        CRUD::column('is_active')->label('Active')->type('boolean');
        CRUD::column('sort_order')->label('Sort')->type('number');
        CRUD::orderBy('sort_order');
        CRUD::orderBy('created_at', 'desc');
    }

    protected function setupCreateOperation(): void
    {
        CRUD::setValidation([
            'slug' => 'required|max:255|unique:combos,slug,' . request()->route('id'),
            'name' => 'required|max:255',
        ]);

        CRUD::field('name')->label('Name')->type('text')->tab('Basic');
        CRUD::field('slug')->label('Slug')->type('text')->tab('Basic');
        CRUD::field('destination')->label('Destination')->type('text')->tab('Basic');
        CRUD::field('duration')->label('Duration')->type('text')->tab('Basic');
        CRUD::field('badge')->label('Badge')->type('text')->tab('Marketing');
        CRUD::field('badge_type')->label('Badge type')->type('text')->tab('Marketing');
        CRUD::field('save_percent')->label('Save percent')->type('number')->attributes(['min' => 0, 'max' => 100])->tab('Marketing');
        CRUD::field('image_url')->label('Image URL')->type('text')->tab('Basic');
        CRUD::field('old_price')->label('Old price')->type('number')->attributes(['step' => '0.01', 'min' => '0'])->tab('Pricing');
        CRUD::field('new_price')->label('New price')->type('number')->attributes(['step' => '0.01', 'min' => '0'])->tab('Pricing');
        CRUD::field('rating')->label('Rating')->type('number')->attributes(['step' => '0.1', 'min' => '0', 'max' => '5'])->tab('Marketing');
        CRUD::field('review_count')->label('Review count')->type('number')->default(0)->tab('Marketing');
        CRUD::field('components')->label('Components')->type('summernote')->tab('Content');
        CRUD::field('itinerary')->label('Itinerary')->type('summernote')->tab('Content');
        CRUD::field('compare_rows')->label('Compare rows')->type('summernote')->tab('Content');
        CRUD::field('reviews')->label('Reviews')->type('summernote')->tab('Content');
        CRUD::field('is_active')->label('Active')->type('boolean')->default(true)->tab('Settings');
        CRUD::field('is_featured')->label('Featured')->type('boolean')->default(false)->tab('Settings');
        CRUD::field('sort_order')->label('Sort order')->type('number')->default(0)->tab('Settings');
    }

    protected function setupUpdateOperation(): void
    {
        $this->setupCreateOperation();
    }
}

