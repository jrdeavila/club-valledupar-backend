<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\TipoUsuario;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        TipoUsuario::insert(['nombre' => 'turista'], ['nombre' => 'socio']);
        TipoUsuario::all()->each(fn ($tipo) => Usuario::factory(4)->create([
            'tipo_usuario_id' => $tipo->id
        ]));
    }
}
