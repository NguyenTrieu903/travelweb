<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class ContactRequest extends Model
{
    use CrudTrait;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'subject',
        'message',
        'status',
    ];
}

