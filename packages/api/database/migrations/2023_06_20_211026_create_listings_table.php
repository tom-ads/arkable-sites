<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('listing_type_id')->constrained('listing_types');
            $table->string('title');
            $table->text('description');
            $table->bigInteger('price');
            $table->time('check_in');
            $table->time('check_out');
            $table->integer('min_stay');
            $table->integer('max_stay');
            $table->integer('max_guests');
            $table->integer('future_reservation_limit');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
