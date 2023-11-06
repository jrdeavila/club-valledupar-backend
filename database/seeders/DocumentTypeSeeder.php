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
            'Estado de Cuenta',
            'Certificación de Socio',
        ];

        foreach ($documentTypes as $documentType) {
            \App\Models\DocumentRequestType::create([
                'name' => $documentType,
            ]);
        }
    }
}
