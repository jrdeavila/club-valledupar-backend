<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plato>
 */
class PlatoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->word();

        return [
            'nombre' => $name,
            'descripcion' => $this->faker->sentence(),
            'precio' => $this->faker->randomFloat(2, 1, 100),
            'disponibilidad' => $this->faker->boolean(),
            'imagen' => $this->getImage($name),
        ];
    }

    private function getImage(string $name): string
    {
        $res = Http::get('https://picsum.photos/200/300');
        Storage::disk('public')->put('platos/' . $name . ".png", $res->body());

        return $name . ".png";
    }
}
