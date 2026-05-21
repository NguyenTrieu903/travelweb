<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('travel_services', function (Blueprint $table) {
            $table->longText('qbar')->nullable()->after('image_url');
        });

        Schema::table('combos', function (Blueprint $table) {
            $table->longText('pkg_strip')->nullable()->after('review_count');
        });
    }

    public function down(): void
    {
        Schema::table('combos', function (Blueprint $table) {
            $table->dropColumn('pkg_strip');
        });

        Schema::table('travel_services', function (Blueprint $table) {
            $table->dropColumn('qbar');
        });
    }
};

