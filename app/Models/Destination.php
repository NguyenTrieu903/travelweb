<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Destination extends Model
{
    use CrudTrait;

    protected $fillable = [
        'slug',
        'name',
        'tag',
        'subtitle',
        'image_url',
        'is_active',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function tours(): HasMany
    {
        return $this->hasMany(Tour::class);
    }
}

