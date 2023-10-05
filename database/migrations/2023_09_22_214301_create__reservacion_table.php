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
        Schema::create('Reservacion', function (Blueprint $table) {
            $table->id();
            $table->enum('estado', ['pendiente', 'aceptada', 'rechazada', 'cancelada', 'finalizada']);
            $table->string('fecha_reservacion');
            $table->string('hora_reservacion');
            $table->foreignId('user_id')->constrained('users')->nullOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Reservacion');
    }
};
