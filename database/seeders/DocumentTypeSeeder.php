<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $documentTypes = [
            [
                'name' => 'Ficha de canje',
                'description' => 'Atención a socios',
            ],
            [
                'name' => 'Formatos de inscripción a escuelas de entrenamiento deportivo',
                'description' => 'Atención a socios',
            ],
            [
                'name' => 'Paz y salvo',
                'description' => 'Cartera',
            ],
            [
                'name' => 'Estados de cuenta',
                'description' => 'Cartera',
            ],
            [
                'name' => 'Certificación de accion',
                'description' => 'Cartera',
            ]
        ];

        foreach ($documentTypes as $documentType) {
            \App\Models\DocumentRequestType::create([
                'name' => $documentType['name'],
                'description' => $documentType['description'],
            ]);
        }
    }
}
