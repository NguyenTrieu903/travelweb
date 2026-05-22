<?php

namespace App\Http\Controllers\Admin;

use App\Models\GalleryItem;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class GalleryItemCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(GalleryItem::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/gallery-item');
        CRUD::setEntityNameStrings('gallery item', 'gallery items');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('title')->label('Title');
        CRUD::column('category_label')->label('Category');
        CRUD::column('image_url')->label('Image');
        CRUD::column('is_active')->label('Active')->type('boolean');
        CRUD::column('sort_order')->label('Sort')->type('number');
        CRUD::orderBy('sort_order');
        CRUD::orderBy('created_at', 'desc');
    }

    protected function setupCreateOperation(): void
    {
        CRUD::setValidation([
            'title' => 'required|max:255',
            'image_url' => 'required|max:255',
        ]);

        CRUD::field('title')->label('Title')->type('text');
        CRUD::field('category')
            ->label('Category')
            ->type('select_from_array')
            ->options([
                'hanh-trinh' => 'Hành Trình',
                'diem-den' => 'Điểm Đến',
                'teambuilding' => 'TeamBuilding',
                'dich-vu' => 'Dịch Vụ',
            ])
            ->allows_null(false);
        CRUD::field('category_label')->label('Category label')->type('text');
        CRUD::field('image_url')->label('Image URL')->type('text');
        CRUD::field('description')->label('Description')->type('textarea');
        CRUD::field('is_active')->label('Active')->type('boolean')->default(true);
        CRUD::field('sort_order')->label('Sort order')->type('number')->default(0);
    }

    protected function setupUpdateOperation(): void
    {
        $this->setupCreateOperation();
    }
}
