<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservacion>
 */
class ReservacionFactory extends Factory
{

    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-1 year', '+1 year');
        $currentDate = new \DateTime();
        $state = $date > $currentDate ? 'pendiente' : 'finalizada';
        return [
            'fecha_reservacion' => $date->format('Y-m-d'),
            'hora_reservacion' => $date->format('H:i'),
            'estado' => $state
        ];
    }
}
