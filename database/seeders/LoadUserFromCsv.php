<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoadUserFromCsv extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = fopen("database/seeders/csv/partners.csv", 'r');

        $headers = fgetcsv($file, null, ";");



        $allowedHeaders = [
            'Email',
            'Accion',
            'Nombre',
            'Direccion',
            'Telefonos',
            'Sexo',
            'Estado',
            'Estadosocio',
            'Celular',
        ];

        // Get the index of the allowed headers

        $allowedHeadersIndex = [];

        foreach ($headers as $index => $header) {
            if (in_array($header, $allowedHeaders)) {
                $allowedHeadersIndex[$header] = $index;
            }
        }






        // Read each line of the csv file and create a seeder row
        while (($row = fgetcsv($file, null, ";")) !== false) {
            $seederRow = [];

            foreach ($allowedHeadersIndex as $header => $index) {
                // If Email is Empty, skip the value
                if (empty($row[$index])) {
                    continue;
                }
                $seederRow[$header] = trim($row[$index]);
            }

            $mappedRow = $this->replaceHeaderByModelAttributes($seederRow);

            $validateExist = $this->validateExist($mappedRow);
            if ($validateExist) {
                continue;
            }
            $user = User::factory()->create($mappedRow);
            $user->assignRole('socio');
        }

        fclose($file);
    }

    private function validateExist($row): bool
    {
        // Has email 
        if (empty($row['email'])) {
            return false;
        }
        // Find User
        $user = User::where('email', $row['email'])->first();
        if ($user) {
            return true;
        }
        return false;
    }

    private function replaceHeaderByModelAttributes($row)
    {
        $attr = [
            'Accion' => 'action',
            'Nombre' => 'name',
            'Direccion' => 'address',
            'Telefonos' => 'phone',
            'Sexo' => 'gender',
            'Estado' => 'state',
            'Estadosocio' => 'state_partner',
            'Email' => 'email',
            'Celular' => 'number_phone',
        ];

        $newRow = [];

        foreach ($row as $key => $value) {
            $newRow[$attr[$key]] = $value;
        }
        return $newRow;
    }
}
