<?php

namespace Database\Seeders;

use App\Models\Carta;
use App\Models\Plato;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoadPlatoFromCsv extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $file = fopen('database/seeders/csv/platos.csv', 'r');

        $headers = fgetcsv($file, null, ",");

        $allowedHeaders = [
            'codproducto',
            'descripcion',
            'vventa',
            'nombreagrupacionproducto',
        ];

        $allowedHeadersIndex  = [];

        foreach ($headers as $index => $header) {
            if (in_array($header, $allowedHeaders)) {
                $allowedHeadersIndex[$header] = $index;
            }
        }

        $grops = [];
        while (($line = fgetcsv($file, null, ",")) !== FALSE) {
            $grops[$line[$allowedHeadersIndex['nombreagrupacionproducto']]] = true;
        }

        fclose($file);


        $grops = array_keys($grops);

        foreach ($grops as $grop) {
            $grop = trim($grop);
            $grop = trim(mb_convert_encoding($grop, "UTF-8", "Windows-1252"));

            $data = [
                'nombre' => $grop,
                'descripcion' => $grop,
            ];
            Carta::create($data);
        }


        $file = fopen('database/seeders/csv/platos.csv', 'r');

        fgetcsv($file, null, ",");

        while (($line = fgetcsv($file, null, ",")) !== FALSE) {
            $data = [];
            foreach ($allowedHeadersIndex as $header => $index) {
                $data[$header] = trim(mb_convert_encoding($line[$index], "UTF-8", "Windows-1252"));
            }



            Plato::create($this->getPlatoData($data));
        }

        fclose($file);
    }

    private function findCarta($nombre)
    {
        return Carta::where('nombre', $nombre)->firstOrFail();
    }

    private function getPlatoData(array $data): array
    {
        return [
            'codigo' => $data['codproducto'],
            'nombre' => $data['descripcion'],
            'descripcion' => $data['descripcion'],
            'precio' => $data['vventa'],
            'disponibilidad' => true,
            'carta_id' => $this->findCarta($data['nombreagrupacionproducto'])->id,
        ];
    }
}
