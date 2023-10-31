<?php

namespace Database\Seeders;

use App\Models\Horario;
use App\Models\InsumeArea;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InsumeAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InsumeArea::create([
            'name' => 'Piscina',
            'desc' => 'Puede ser cualquier tipo de insumo para la piscina',
            'color' => '#0000ff',
        ]);

        InsumeArea::create([
            'name' => 'Cancha de futbol',
            'desc' => 'Puede ser cualquier tipo de insumo para la cancha de futbol',
            'color' => '#00ff00',
        ]);

        InsumeArea::create([
            'name' => 'Cancha de tenis',
            'desc' => 'Puede ser cualquier tipo de insumo para la cancha de tenis',
            'color' => '#ff0000',
        ]);

        InsumeArea::create([
            'name' => 'Gimnasio',
            'desc' => 'Puede ser cualquier tipo de insumo para el gimnasio',
            'color' => '#ffff00',
        ]);

        InsumeArea::create([
            'name' => 'Billar',
            'desc' => 'Puede ser cualquier tipo de insumo para el billar',
            'color' => '#00ffff',
        ]);


        // Asignar horarios a las areas
        $schedules = Horario::all();

        InsumeArea::all()->each(function ($insumeArea) use ($schedules) {
            $insumeArea->schedules()->attach(
                $schedules
            );
        });
    }
}
