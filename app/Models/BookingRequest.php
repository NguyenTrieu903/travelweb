<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingRequest extends Model
{
    use CrudTrait;

    protected $fillable = [
        'tour_id',
        'combo_id',
        'service_id',
        'customer_name',
        'phone',
        'email',
        'travel_date',
        'guest_count',
        'note',
        'status',
    ];

    protected $casts = [
        'travel_date' => 'date',
        'guest_count' => 'integer',
    ];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }

    public function combo(): BelongsTo
    {
        return $this->belongsTo(Combo::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(TravelService::class, 'service_id');
    }
}

