<?php

namespace Database\Seeders;

use App\Models\Horario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HorarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Horario::create([
            'fecha_apertura' => '08:00',
            'fecha_cierre' => '14:00',
            'lunes' => true,
            'martes' => true,
            'miercoles' => true,
            'jueves' => true,
            'viernes' => true,
            'sabado' => true,
            'domingo' => true,
        ]);

        Horario::create([
            'fecha_apertura' => '18:00',
            'fecha_cierre' => '23:00',
            'lunes' => true,
            'martes' => true,
            'miercoles' => true,
            'jueves' => true,
            'viernes' => true,
            'sabado' => true,
            'domingo' => true,
        ]);
    }
}
