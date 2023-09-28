<?php

namespace Database\Seeders;

use App\Models\TipoUsuario;
use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TipoUsuario::create(['nombre' => 'turista']);

        TipoUsuario::create(['nombre' => 'socio']);

        TipoUsuario::all()->each(fn ($tipo) => Usuario::factory(4)->create([
            'tipo_usuario_id' => $tipo->id
        ]));
    }
}
