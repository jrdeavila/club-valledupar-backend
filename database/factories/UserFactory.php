<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'action' => fake()->numberBetween(1000, 9999),
            'gender' => fake()->randomElement(['M', 'F']),
            'state' => fake()->randomElement(['A', 'I']),
            'state_partner' => fake()->randomElement(['A', 'I']),
            'address' => fake()->address(),
            'number_phone' => fake()->phoneNumber(), // 'phone' => fake()->phoneNumber(),
            'active' => true,
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => null,
            'password' => bcrypt('clubvalledupar2023'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
