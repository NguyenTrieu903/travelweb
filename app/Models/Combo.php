<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Combo extends Model
{
    use CrudTrait;

    protected $fillable = [
        'slug',
        'name',
        'destination',
        'duration',
        'badge',
        'badge_type',
        'save_percent',
        'image_url',
        'old_price',
        'new_price',
        'rating',
        'review_count',
        'pkg_strip',
        'components',
        'itinerary',
        'compare_rows',
        'reviews',
        'is_active',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'save_percent' => 'integer',
        'old_price' => 'decimal:2',
        'new_price' => 'decimal:2',
        'rating' => 'decimal:1',
        'review_count' => 'integer',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function bookingRequests(): HasMany
    {
        return $this->hasMany(BookingRequest::class);
    }
}
