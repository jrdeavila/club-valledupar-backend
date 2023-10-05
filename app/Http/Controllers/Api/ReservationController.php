<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateReservationRequest;
use App\Http\Resources\Api\ReservationCollection;
use App\Http\Resources\Api\ReservationResource;
use App\Models\Reservacion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function index(User $user)
    {
        return new ReservationCollection($user->reservaciones);
    }


    public function store(CreateReservationRequest $request)
    {
        $reservation =  Reservacion::create([
            'fecha_reservacion' => $request->reservation_date,
            'time' => $request->reservation_time,
            'user_id' => $request->user_id,
        ]);

        return new ReservationResource($reservation);
    }
}
