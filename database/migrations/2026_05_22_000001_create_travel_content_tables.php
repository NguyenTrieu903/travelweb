<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('tag')->nullable();
            $table->text('subtitle')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->nullable()->constrained()->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->string('image_url')->nullable();
            $table->string('duration')->nullable();
            $table->string('departure')->nullable();
            $table->string('transport')->nullable();
            $table->decimal('price', 15, 2)->nullable();
            $table->string('price_text')->nullable();
            $table->string('badge_text')->nullable();
            $table->string('badge_type')->nullable();
            $table->text('tags')->nullable();
            $table->text('filters')->nullable();
            $table->text('departure_dates')->nullable();
            $table->longText('itinerary')->nullable();
            $table->longText('includes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('travel_services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('badge')->nullable();
            $table->string('badge_icon')->nullable();
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->string('image_url')->nullable();
            $table->longText('highlights')->nullable();
            $table->longText('includes')->nullable();
            $table->longText('packages')->nullable();
            $table->longText('process')->nullable();
            $table->longText('faq')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('combos', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('destination')->nullable();
            $table->string('duration')->nullable();
            $table->string('badge')->nullable();
            $table->string('badge_type')->nullable();
            $table->unsignedTinyInteger('save_percent')->nullable();
            $table->string('image_url')->nullable();
            $table->decimal('old_price', 15, 2)->nullable();
            $table->decimal('new_price', 15, 2)->nullable();
            $table->decimal('rating', 3, 1)->nullable();
            $table->unsignedInteger('review_count')->default(0);
            $table->longText('components')->nullable();
            $table->longText('itinerary')->nullable();
            $table->longText('compare_rows')->nullable();
            $table->longText('reviews')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('category')->nullable();
            $table->string('category_label')->nullable();
            $table->string('title');
            $table->string('image_url');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('travel_videos', function (Blueprint $table) {
            $table->id();
            $table->string('category')->nullable();
            $table->string('category_label')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->string('video_url');
            $table->boolean('is_local')->default(false);
            $table->string('duration')->nullable();
            $table->string('badge_text')->nullable();
            $table->string('badge_type')->nullable();
            $table->string('views_text')->nullable();
            $table->string('published_text')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('booking_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tour_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('combo_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('service_id')->nullable()->constrained('travel_services')->nullOnDelete();
            $table->string('customer_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->date('travel_date')->nullable();
            $table->unsignedInteger('guest_count')->nullable();
            $table->text('note')->nullable();
            $table->string('status')->default('new');
            $table->timestamps();
        });

        Schema::create('contact_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('subject')->nullable();
            $table->text('message')->nullable();
            $table->string('status')->default('new');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_requests');
        Schema::dropIfExists('booking_requests');
        Schema::dropIfExists('travel_videos');
        Schema::dropIfExists('gallery_items');
        Schema::dropIfExists('combos');
        Schema::dropIfExists('travel_services');
        Schema::dropIfExists('tours');
        Schema::dropIfExists('destinations');
    }
};

