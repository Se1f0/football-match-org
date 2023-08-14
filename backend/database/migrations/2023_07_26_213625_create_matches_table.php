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
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_id');
            $table->dateTime('date_time');
            $table->string('location');
            $table->unsignedInteger('team_size');
            $table->enum('skill_level', ['beginner', 'intermediate', 'advanced']);
            $table->string('home_team_name');
            $table->text('home_team_players');
            $table->string('away_team_name');
            $table->text('away_team_players');
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
