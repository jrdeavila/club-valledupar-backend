<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateReservacionRequest;
use App\Http\Resources\ReservacionCollection;
use App\Http\Resources\UserCollection;
use App\Models\InsumeArea;
use App\Models\Reservacion;
use App\Models\Reservation;
use App\Models\TypeReservation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $type = TypeReservation::find($request->type);
        $models = Reservation::where('insume_area_id', $type?->id)->get();
        return Inertia::render('Reservacion/Index', [
            "reservaciones" => new ReservacionCollection($models),
            'tipos' => InsumeArea::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reservacion/Create', [
            'users' => new UserCollection(User::role(['socio', 'turista'])->get()),
            'insumes' => InsumeArea::all(),
            'types' => TypeReservation::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateReservacionRequest $request)
    {
        $reservation =  Reservation::create($request->validated());
        if (isset($request->observations)) {
            $reservation->observations()->create([
                'reservation_id' => $reservation->id,
                'observation' => $request->observations,
            ]);
        }
        return to_route('reservaciones.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservacion)
    {

        $reservacion->delete();
        return to_route('reservaciones.index');
    }
}
