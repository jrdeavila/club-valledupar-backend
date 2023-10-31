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
        Schema::create('insume_areas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('desc');
            $table->string('color');
        });

        Schema::create('insume_area_schedule', function (BluePrint $table) {
            $table->id();
            $table->foreignId('insume_area_id')->constrained('insume_areas')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('schedule_id')->constrained('Horario')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insume_areas');
        Schema::dropIfExists('insume_area_schedule');
    }
};
