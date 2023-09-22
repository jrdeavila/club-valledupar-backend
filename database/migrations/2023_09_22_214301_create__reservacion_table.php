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
            $table->enum('estado', ['pendiente', 'aceptada', 'cancelada']);
            $table->string('fecha_reservacion');
            $table->string('hora_reservacion');
            $table->foreignId('id_horario')->constrained('Horario');
            $table->string('usuario_id');
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
