<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TravelService extends Model
{
    use CrudTrait;

    protected $table = 'travel_services';

    protected $fillable = [
        'slug',
        'name',
        'badge',
        'badge_icon',
        'summary',
        'description',
        'image_url',
        'qbar',
        'highlights',
        'includes',
        'packages',
        'process',
        'faq',
        'is_active',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function bookingRequests(): HasMany
    {
        return $this->hasMany(BookingRequest::class, 'service_id');
    }
}
