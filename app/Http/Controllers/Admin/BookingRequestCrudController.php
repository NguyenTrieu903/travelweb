<?php

namespace App\Http\Controllers\Admin;

use App\Models\BookingRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class BookingRequestCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(BookingRequest::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/booking-request');
        CRUD::setEntityNameStrings('booking request', 'booking requests');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('customer_name')->label('Customer');
        CRUD::column('phone')->label('Phone');
        CRUD::column('email')->label('Email');
        CRUD::column('travel_date')->label('Travel date')->type('date');
        CRUD::column('guest_count')->label('Guests')->type('number');
        CRUD::column('status')->label('Status');
        CRUD::column('created_at')->label('Created')->type('datetime');
        CRUD::orderBy('created_at', 'desc');
    }

    protected function setupUpdateOperation(): void
    {
        CRUD::field('customer_name')->label('Customer')->type('text');
        CRUD::field('phone')->label('Phone')->type('text');
        CRUD::field('email')->label('Email')->type('email');
        CRUD::field('travel_date')->label('Travel date')->type('date');
        CRUD::field('guest_count')->label('Guests')->type('number');
        CRUD::field('note')->label('Note')->type('textarea');
        CRUD::field('status')->label('Status')->type('select_from_array')->options([
            'new' => 'New',
            'contacted' => 'Contacted',
            'confirmed' => 'Confirmed',
            'cancelled' => 'Cancelled',
            'closed' => 'Closed',
        ])->default('new');
    }
}

