<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservacion>
 */
class ReservacionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-1 year', '+1 year');
        $currentDate = new \DateTime();
        $state = $date > $currentDate ? 'pendiente' : 'finalizada';
        return [
            'fecha_reservacion' => $date->format('Y-m-d'),
            'hora_reservacion' => $date->format('H:i'),
            'horario_id' => $this->faker->numberBetween(1, 2),
            'estado' => $state
        ];
    }
}
