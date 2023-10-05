<?php

namespace Database\Seeders;

use App\Models\InsumeArea;
use App\Models\Reservation;
use App\Models\TypeReservation;
use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TypeReservation::create([
            'name' => 'Clases de natación',
            'desc' => 'Clases de natación',
        ]);

        TypeReservation::create([
            'name' => 'Clases de tenis',
            'desc' => 'Clases de tenis',
        ]);

        TypeReservation::create([
            'name' => 'Clases de futbol',
            'desc' => 'Clases de futbol',
        ]);


        InsumeArea::all()->each(function ($type) {
            $type->reservations()->saveMany(
                Reservation::factory(20)->make([
                    'insume_area_id' => $type->id,
                    'type_reservation_id' => 1,
                ])->each(function (Reservation $reservation) {
                    $reservation->user()->associate(1);
                })
            );
        });
    }
}
