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
        Schema::create('Plato', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 50);
            $table->text('descripcion', 255);
            $table->decimal('precio', 10, 0);
            $table->string('imagen')->nullable();
            $table->boolean('disponibilidad');
            $table->foreignId('carta_id')->constrained('Carta')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Plato');
    }
};
