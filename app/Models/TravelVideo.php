<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;

class TravelVideo extends Model
{
    use CrudTrait;

    protected $table = 'travel_videos';

    protected $fillable = [
        'category',
        'category_label',
        'title',
        'description',
        'thumbnail_url',
        'video_url',
        'is_local',
        'duration',
        'badge_text',
        'badge_type',
        'views_text',
        'published_text',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_local' => 'boolean',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}

