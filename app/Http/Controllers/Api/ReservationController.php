<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateReservationRequest;
use App\Http\Resources\Api\ReservationCollection;
use App\Http\Resources\Api\ReservationResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function index(User $user)
    {
        // Order by created at desc
        $reservations = $user->reservations()->orderBy('created_at', 'desc')->get();
        return new ReservationCollection($reservations);
    }


    public function store(CreateReservationRequest $request, User $user)
    {
        DB::beginTransaction();
        $reservation =          $user->reservations()->create($request->validated());
        if (isset($request->observations)) {
            foreach ($request->observations  as $observation) {
                $reservation->observations()->create([
                    'observation' => $observation,
                ]);
            }
        }

        DB::commit();

        return new ReservationResource($reservation);
    }
}
