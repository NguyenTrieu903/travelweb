<?php

namespace App\Http\Controllers\Admin;

use App\Models\ContactRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class ContactRequestCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    public function setup(): void
    {
        CRUD::setModel(ContactRequest::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/contact-request');
        CRUD::setEntityNameStrings('contact request', 'contact requests');
    }

    protected function setupListOperation(): void
    {
        CRUD::column('id')->label('ID');
        CRUD::column('name')->label('Name');
        CRUD::column('phone')->label('Phone');
        CRUD::column('email')->label('Email');
        CRUD::column('subject')->label('Subject');
        CRUD::column('status')->label('Status');
        CRUD::column('created_at')->label('Created')->type('datetime');
        CRUD::orderBy('created_at', 'desc');
    }

    protected function setupUpdateOperation(): void
    {
        CRUD::field('name')->label('Name')->type('text');
        CRUD::field('phone')->label('Phone')->type('text');
        CRUD::field('email')->label('Email')->type('email');
        CRUD::field('subject')->label('Subject')->type('text');
        CRUD::field('message')->label('Message')->type('textarea');
        CRUD::field('status')->label('Status')->type('select_from_array')->options([
            'new' => 'New',
            'contacted' => 'Contacted',
            'closed' => 'Closed',
        ])->default('new');
    }
}

