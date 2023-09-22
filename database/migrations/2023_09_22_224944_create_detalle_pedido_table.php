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
        Schema::create('DetallePedido', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pedido_id')->constrained('Pedido');
            $table->foreignId('plato_id')->constrained('Plato');
            $table->integer('cantidad');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('DetallePedido');
    }
};
