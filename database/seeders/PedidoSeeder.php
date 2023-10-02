<?php

namespace Database\Seeders;

use App\Models\DetallePedido;
use App\Models\Pedido;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PedidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::role(['socio', 'turista'])->get()->each(function (User $usuario) {
            $usuario->pedidos()->save(Pedido::factory()->make([
                'user_id' => $usuario->id,
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
