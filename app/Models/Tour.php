<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tour extends Model
{
    use CrudTrait;

    protected $fillable = [
        'destination_id',
        'slug',
        'title',
        'summary',
        'description',
        'image_url',
        'duration',
        'departure',
        'transport',
        'price',
        'price_text',
        'badge_text',
        'badge_type',
        'tags',
        'filters',
        'departure_dates',
        'itinerary',
        'includes',
        'is_active',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    public function bookingRequests(): HasMany
    {
        return $this->hasMany(BookingRequest::class);
    }
}

