<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateReservacionRequest;
use App\Http\Resources\InsumeAreaResume;
use App\Http\Resources\ReservacionCollection;
use App\Http\Resources\UserCollection;
use App\Models\InsumeArea;
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
        if ($request->get('type') == null) {
            return redirect()->route('reservaciones.index', ['type' => 1]);
        }
        $type = InsumeArea::findOrFail($request->type);
        $models = Reservation::where('insume_area_id', $type->id)->get();
        return Inertia::render('Reservacion/Index', [
            "reservaciones" => new ReservacionCollection($models),
            'types' => InsumeAreaResume::collection(InsumeArea::all()),
            'users' => new UserCollection(User::role(['socio'])->get()),

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
