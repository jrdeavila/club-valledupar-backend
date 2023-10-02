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
        // Schema::create('TipoUsuario', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('nombre');
        // });
        // Schema::create('Usuario', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('email');
        //     $table->string('password');
        //     $table->string('nombre');
        //     $table->string('apellido');
        //     $table->string('telefono');
        //     $table->foreignId('tipo_usuario_id')->constrained("TipoUsuario")->nullOnDelete()->cascadeOnUpdate();
        //     $table->timestamps();
        // });

        // Schema::table('Reservacion', function (Blueprint $table) {
        //     $table->foreignId('usuario_id')->constrained('Usuario')->cascadeOnUpdate()->nullOnDelete();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('Reservacion', function (Blueprint $table) {
        //     $table->dropConstrainedForeignId('usuario_id');
        // });

        // Schema::dropIfExists('Usuario');
        // Schema::dropIfExists('TipoUsuario');
    }
};
