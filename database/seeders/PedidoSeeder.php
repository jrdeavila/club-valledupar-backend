<?php

namespace Database\Seeders;

use App\Models\DetallePedido;
use App\Models\Pedido;
use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PedidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::all()->each(function (Usuario $usuario) {
            $usuario->pedidos()->save(Pedido::factory()->make([
                'usuario_id' => $usuario->id,
            ]));
            $usuario->pedidos()->each(function (Pedido $pedido) {
                $pedido->detallePedido()->save(DetallePedido::make([
                    'pedido_id' => $pedido->id,
                    'plato_id' => 1,
                    'cantidad' => 2,
                ]));
            });
        });
    }
}
