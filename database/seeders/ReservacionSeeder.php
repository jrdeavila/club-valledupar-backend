<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::all()->each(function (Usuario $user) {
            $user->reservaciones()->saveMany(\App\Models\Reservacion::factory(20)->make([
                'usuario_id' => $user->id,
            ]));
        });
    }
}
