<?php

namespace Database\Seeders;

use App\Models\Carta;
use App\Models\Plato;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CartaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Carta::factory(5)->create()->each(function (Carta $item) {
            $item->platos()->saveMany(Plato::factory(5)->make());
        });
    }
}
