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
        Schema::table('Horario', function (Blueprint $table) {
            $table->addColumn('boolean', 'lunes')->default(true);
            $table->addColumn('boolean', 'martes')->default(true);
            $table->addColumn('boolean', 'miercoles')->default(true);
            $table->addColumn('boolean', 'jueves')->default(true);
            $table->addColumn('boolean', 'viernes')->default(true);
            $table->addColumn('boolean', 'sabado')->default(true);
            $table->addColumn('boolean', 'domingo')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Horario', function (Blueprint $table) {
            $table->dropColumn('lunes');
            $table->dropColumn('martes');
            $table->dropColumn('miercoles');
            $table->dropColumn('jueves');
            $table->dropColumn('viernes');
            $table->dropColumn('sabado');
            $table->dropColumn('domingo');
        });
    }
};
