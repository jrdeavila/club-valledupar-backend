<?php

namespace Database\Seeders;

use App\Models\InsumeArea;
use App\Models\Reservation;
use App\Models\User;
use DateTime;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Registrar reservaciones por cada usuario socio. Agregar Insumo a la reservacion y dos observaciones
        $users = User::role('socio')->get();
        $insumes = InsumeArea::all();

        foreach ($users as $user) {
            $reservation = Reservation::factory(10)->create([
                'user_id' => $user->id,
                'insume_area_id' => $insumes->random()->id,
            ]);
            $reservation->map(function ($reservation) {
                $reservation->observations()->create([
                    'reservation_id' => $reservation->id,
                    'observation' => 'Observacion 1',
                ]);
                $reservation->observations()->create([
                    'reservation_id' => $reservation->id,
                    'observation' => 'Observacion 2',
                ]);
            });
        }
    }
}
