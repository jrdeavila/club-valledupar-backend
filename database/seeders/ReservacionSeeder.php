<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Only Users with role 'socio' or 'turista' can make a reservation
        User::role(['socio', 'turista'])->get()->each(function (User $user) {
            $user->reservaciones()->saveMany(\App\Models\Reservacion::factory(20)->make([
                'user_id' => $user->id,
            ]));
        });
    }
}
