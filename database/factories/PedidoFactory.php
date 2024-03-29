<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pedido>
 */
class PedidoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $esDomicilio = fake()->boolean();
        return [
            'es_domicilio' => $esDomicilio,
            'direccion' => $esDomicilio ? fake()->address() : null,
        ];
    }
}
